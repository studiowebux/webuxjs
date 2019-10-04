import http from "../../resources/http";
import jwtDecode from "jwt-decode";
import router from "../../router";
import socket from "../../resources/socket";
import getCookies from "../../resources/getCookies";

/* LOCAL Functions */
function setCookies(accessToken = null, refreshToken = null, userID = null) {
  if (accessToken) {
    window.$cookies.set(
      "accessToken",
      accessToken.token,
      accessToken.expiresIn
    );
  }

  if (refreshToken) {
    window.$cookies.set(
      "refreshToken",
      refreshToken.token,
      refreshToken.expiresIn
    );
  }

  if (userID) {
    window.$cookies.set("userID", userID.id, userID.expiresIn);
  }

  return;
}

/* STORE Functions */

const state = {
  accessToken: null,
  userID: null,
  connections: null,
  timeout: false,
  initialized: false
};

const mutations = {
  AUTH(state, user) {
    state.accessToken = user.accessToken;
    state.userID = user.userID;
  },
  REFRESHED(state, accessToken) {
    state.accessToken = accessToken;
  },
  CLEAR_AUTH(state) {
    state.accessToken = null;
    state.userID = null;
    state.connections = null;
  },
  SET_CONNECTIONS(state, connections) {
    state.connections = connections;
  },
  SET_INIT(state) {
    console.log("********* Vuex Initialized ! ***********");
    state.initialized = true;
  },
  TIMEOUT(state, status) {
    state.timeout = status;
  }
};

const actions = {
  setInit: ({ commit }) => {
    console.log("The app is initialized");
    commit("SET_INIT");
  },
  setAutoRefresh: ({ dispatch, commit, state }, timer) => {
    const timeout = Math.ceil(timer - 15) * 1000;
    console.log(
      "SETAUTOREFRESH - Create the timeout function with value of " + timeout
    );
    console.log(state);
    if (!state.timeout) {
      console.log("set timeout...");
      commit("TIMEOUT", true);
      setTimeout(async () => {
        console.log("SETAUTOREFRESH - TIMEOUT CALLED ! ");

        const refreshToken = await getCookies("refreshToken");
        const userID = await getCookies("userID");

        console.log(
          "SETAUTOREFRESH - Dispatch refreshToken with values + " +
            refreshToken +
            " || " +
            userID
        );
        commit("TIMEOUT", false);
        dispatch("refreshToken", { refreshToken, userID });
      }, timeout);
    } else {
      console.log("Timeout already there...");
    }
  },
  signIn: ({ commit, dispatch }, credentials) => {
    dispatch("isLoading");
    if (!credentials.email || !credentials.password) {
      return;
    }
    http
      .post("/auth/signin", {
        email: credentials.email,
        password: credentials.password
      })
      .then(response => {
        const decoded = jwtDecode(response.data.tokens.access);
        const decodedRefresh = jwtDecode(response.data.tokens.refresh);
        const now = Date.now() / 1000;

        const user = {
          accessToken: response.data.tokens.access,
          userID: decoded._id
        };

        setCookies(
          { token: response.data.tokens.access, expiresIn: decoded.exp - now },
          {
            token: response.data.tokens.refresh,
            expiresIn: decodedRefresh.exp - now
          },
          { id: decoded._id, expiresIn: decodedRefresh.exp - now }
        );

        commit("AUTH", user);
        console.log("SIGNIN - Dispatch setAutoRefresh " + (decoded.exp - now));
        dispatch("setAutoRefresh", decoded.exp - now);
        console.log(
          "SIGNIN - Init the socket.io with access token " + user.accessToken
        );
        socket.open();
        router.replace("/").catch(() => {});
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  signUp: ({ commit, dispatch }, user) => {
    dispatch("isLoading");
    http
      .post("/auth/signup", user)
      .then(response => {
        const userID = response.data._id;
        const decoded = jwtDecode(response.data.tokens.access);
        const decodedRefresh = jwtDecode(response.data.tokens.refresh);
        const now = Date.now() / 1000;

        setCookies(
          { token: response.data.tokens.access, expiresIn: decoded.exp - now },
          {
            token: response.data.tokens.refresh,
            expiresIn: decodedRefresh.exp - now
          },
          { id: userID, expiresIn: decodedRefresh.exp - now }
        );

        commit("AUTH", {
          accessToken: response.data.tokens.access,
          userID: userID
        });
        console.log(
          "SIGNUP - dispatch setAutoRefresh with " + (decoded.exp - now)
        );
        dispatch("setAutoRefresh", decoded.exp - now);

        console.log("SIGNUP - Init the socket.io");
        socket.open();
        router.replace("/").catch(() => {});
      })
      .catch(error => {
        commit("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  refreshToken: ({ commit, dispatch }, user) => {
    console.log("REFRESHTOKEN - call refresh token");
    console.log(
      "REFRESHTOKEN - user values " + user.refreshToken + " || " + user.userID
    );

    if (!user.refreshToken || !user.userID) {
      console.log("REFRESHTOKEN - Missing userID or refreshToken");
      console.log(
        "REFRESHTOKEN - Dispatch logout now, because in 15 seconds the user will have to login again"
      );
      dispatch("logout");
      return;
    }

    dispatch("isLoading");
    http
      .post("/auth/refresh", {
        refreshToken: user.refreshToken,
        userID: user.userID
      })
      .then(response => {
        console.log(
          "REFRESHTOKEN - access token refreshed " + response.data.token
        );
        const decoded = jwtDecode(response.data.token);
        const now = Date.now() / 1000;
        console.log(
          "REFRESHTOKEN - Set access token cookie with expiration time of " +
            (decoded.exp - now)
        );

        setCookies({
          token: response.data.token,
          expiresIn: decoded.exp - now
        });

        console.log("REFRESHTOKEN - Commit REFRESHED");

        commit("REFRESHED", response.data.token);

        console.log(
          "REFRESHTOKEN - dispatch setAutoRefresh with timeout value of " +
            (decoded.exp - now)
        );
        dispatch("setAutoRefresh", decoded.exp - now);
      })
      .catch(error => {
        console.log(
          "REFRESHTOKEN - An error occurs while refreshing the token,"
        );
        console.log("REFRESHTOKEN - dispatch logout");
        dispatch("logout");
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  autoLogin: ({ commit, dispatch, state }) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("AUTOLOGIN - Get the cookie values");
        const accessToken = await getCookies("accessToken");
        const userID = await getCookies("userID");

        console.log(accessToken);
        console.log(userID);

        console.log("AUTOLOGIN - Check if the access Token is present");

        if (!accessToken || !userID) {
          console.log("AUTOLOGIN - No access token or userID, exit");
          if (state.userID || state.accessToken) {
            dispatch("logout");
          }
          return reject(new Error("No access token or userID"));
        }

        const decoded = jwtDecode(accessToken);
        const expirationDate = decoded.exp;
        const now = new Date() / 1000;

        if (now >= expirationDate) {
          console.log("AUTOLOGIN - Access token expired, exit");
          return reject(new Error("Access token expired"));
        }

        console.log("AUTOLOGIN - Commit AUTH");
        commit("AUTH", {
          accessToken,
          userID
        });
        console.log(
          "AUTOLOGIN - Dispatch set auto refresh with timeout value of " +
            (expirationDate - now)
        );
        dispatch("setAutoRefresh", expirationDate - now);
        dispatch("setInit");
        dispatch("doneLoading");
        resolve();
      } catch (e) {
        throw e;
      }
    });
  },
  lostPassword: ({ dispatch }, email) => {
    dispatch("isLoading");
    http
      .post("/auth/lost-password", { email })
      .then(response => {
        dispatch("setSuccess", response.data.msg);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  retrievePassword: ({ dispatch }, user) => {
    dispatch("isLoading");
    http
      .post("/auth/retrieve-password", user)
      .then(response => {
        dispatch("setSuccess", response.data.info);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  getConnections: ({ commit, dispatch }) => {
    dispatch("isLoading");
    http
      .get("/auth/my-connection")
      .then(response => {
        commit("SET_CONNECTIONS", response.data.connections);
      })
      .catch(error => {
        commit("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  logout: async ({ commit, dispatch }) => {
    console.log("LOGOUT - Put the cookie values to the variables");
    const accessToken = await getCookies("accessToken");
    const refreshToken = await getCookies("refreshToken");

    if (accessToken && refreshToken) {
      console.log(
        "LOGOUT - The access token and the refresh token is present in the cookie"
      );
      console.log(
        "we will try to send logout to the backend, it will blacklist the tokens"
      );
      dispatch("isLoading");
      http
        .post("/auth/logout", {
          accessToken,
          refreshToken
        })
        .catch(error => {
          dispatch("setError", error);
        })
        .finally(() => {
          dispatch("doneLoading");
        });
    }

    console.log("LOGOUT - Commit CLEAR_AUTH");
    commit("CLEAR_AUTH");
    console.log("LOGOUT - Clear the cookies");
    window.$cookies.remove("accessToken");
    window.$cookies.remove("refreshToken");
    window.$cookies.remove("userID");
    console.log("LOGOUT - Redirect the user to the / page");
    router.push("/").catch(() => {});
  }
};

const getters = {
  accessToken: state => {
    return state.accessToken;
  },
  refreshToken: state => {
    return state.refreshToken;
  },
  userID: state => {
    return state.userID;
  },
  connections: state => {
    return state.connections;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
