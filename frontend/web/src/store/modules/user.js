import http from "../../resources/axios";
import jwtDecode from "jwt-decode";
import router from "../../router";

const state = {
  accessToken: null,
  id: null,
  expiresIn: null,
  success_message: null,
  connections: null
};

const mutations = {
  AUTH(state, user) {
    state.accessToken = user.accessToken;
    state.expiresIn = user.expiresIn;
    state.id = user.id;
  },
  CLEAR_AUTH(state) {
    state.accessToken = null;
    state.expiresIn = null;
    state.id = null;
    state.connections = null;
  },
  SET_SUCCESS(state, msg) {
    state.success_message = msg;
  },
  LOAD_CONNECTIONS(state, connections) {
    state.connections = connections;
  }
};

const actions = {
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("autoLogin");
    }, expirationTime * 1000);
  },
  signIn: ({ commit, dispatch }, credentials) => {
    http
      .post("/auth/signin", {
        email: credentials.email,
        password: credentials.password
      })
      .then(response => {
        const decoded = jwtDecode(response.data.tokens.access);
        const decodedRefresh = jwtDecode(response.data.tokens.refresh);

        const user = {
          expiresIn: decoded.exp - decoded.iat,
          accessToken: response.data.tokens.access,
          id: decoded.id
        };

        window.$cookies.set(
          "accessToken",
          response.data.tokens.access,
          user.expiresIn
        );
        window.$cookies.set(
          "refreshToken",
          response.data.tokens.refresh,
          decodedRefresh.exp - decodedRefresh.iat
        );
        window.$cookies.set(
          "userID",
          user.id,
          decodedRefresh.exp - decodedRefresh.iat
        );

        commit("AUTH", user);
        commit("RESET_ERROR");

        dispatch("setLogoutTimer", user.expiresIn);
        router.replace("/");
      })
      .catch(error => {
        console.log(error)
        dispatch("logout");
        commit("SET_ERROR", error.response.message);
      });
  },
  signUp: ({ commit, dispatch }, user) => {
    http
      .post("/auth/signup", user)
      .then(response => {
        const decoded = jwtDecode(response.data.tokens.access);
        const decodedRefresh = jwtDecode(response.data.tokens.refresh);

        const user = {
          expiresIn: decoded.exp - decoded.iat,
          accessToken: response.data.tokens.access,
          id: decoded.id
        };

        window.$cookies.set(
          "accessToken",
          response.data.tokens.access,
          user.expiresIn
        );
        window.$cookies.set(
          "refreshToken",
          response.data.tokens.refresh,
          decodedRefresh.exp - decodedRefresh.iat
        );
        window.$cookies.set(
          "userID",
          user.id,
          decodedRefresh.exp - decodedRefresh.iat
        );

        commit("AUTH", user);
        commit("RESET_ERROR");

        dispatch("setLogoutTimer", user.expiresIn);
        router.replace("/");
      })
      .catch(error => {
        dispatch("logout");
        commit("SET_ERROR", error.response.message);
      });
  },
  refreshToken: ({ commit, dispatch }, user) => {
    http
      .post("/auth/refresh", {
        refreshToken: user.refreshToken,
        userID: user.id
      })
      .then(response => {
        const decoded = jwtDecode(response.data.token);

        const user = {
          expiresIn: decoded.exp - decoded.iat,
          accessToken: response.data.token,
          id: decoded.id
        };

        window.$cookies.set("accessToken", response.data.token, user.expiresIn);

        commit("AUTH", user);
        commit("RESET_ERROR");

        dispatch("setLogoutTimer", user.expiresIn);
      })
      .catch(error => {
        dispatch("logout");
        commit("SET_ERROR", error.response.message);
      });
  },
  autoLogin: ({ commit, dispatch }) => {
    const accessToken = window.$cookies.get("accessToken");
    const refreshToken = window.$cookies.get("refreshToken");
    const userID = window.$cookies.get("userID");

    if (!accessToken) {
      if (!refreshToken) {
        commit("CLEAR_AUTH");
        return;
      }
      dispatch("refreshToken", { refreshToken, id: userID });
      return;
    }
    const decoded = jwtDecode(accessToken);
    const now = new Date();

    if (now >= decoded.exp * 1000) {
      commit("CLEAR_AUTH");
      return;
    }
    commit("AUTH", {
      expiresIn: decoded.exp - decoded.iat,
      accessToken: accessToken
    });
    commit("RESET_ERROR");
    dispatch("setLogoutTimer", decoded.exp - decoded.iat);
  },
  lostPassword: ({ commit }, email) => {
    http
      .post("/auth/lost-password", { email })
      .then(response => {
        console.log(response.data);
        commit("SET_SUCCESS", response.data.msg);
      })
      .catch(error => {
        commit("SET_ERROR", error.response.message);
      });
  },
  retrievePassword: ({ commit }, user) => {
    http
      .post("/auth/retrieve-password", user)
      .then(response => {
        console.log(response.data);
        commit("SET_SUCCESS", response.data.info);
      })
      .catch(error => {
        commit("SET_ERROR", error.response.message);
      });
  },
  getConnections: ({ commit }) => {
    http
      .get("/auth/my-connection")
      .then(response => {
        console.log(response.data);
        commit("LOAD_CONNECTIONS", response.data.connections);
      })
      .catch(error => {
        commit("SET_ERROR", error.response.message);
      });
  },
  logout: ({ commit }) => {
    if (
      window.$cookies.get("accessToken") &&
      window.$cookies.get("refreshToken")
    ) {
      http
        .post("/auth/logout", {
          accessToken: window.$cookies.get("accessToken"),
          refreshToken: window.$cookies.get("refreshToken")
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          commit("SET_ERROR", error.response.message);
        })
        .finally(() => {
          commit("CLEAR_AUTH");
          window.$cookies.remove("accessToken");
          window.$cookies.remove("refreshToken");
          window.$cookies.remove("userID");
          router.push("/").catch(e => {});
        });
    }
  }
};

const getters = {
  accessToken: state => {
    return state.accessToken;
  },
  success_message: state => {
    return state.success_message;
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
