import http from "../../resources/axios";
import jwtDecode from "jwt-decode";
import router from "../../router";
import axios from "../../resources/axios";

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
      .post("/signin", {
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
        commit("CLEAR_AUTH");
        commit("SET_ERROR", error);
      });
  },
  signUp: ({ commit, dispatch }, user) => {
    http
      .post("/signup", user)
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
        commit("CLEAR_AUTH");
        commit("SET_ERROR", error);
      });
  },
  refreshToken: ({ commit, dispatch }, user) => {
    axios
      .post("/refresh", {
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
        commit("CLEAR_AUTH");
        commit("SET_ERROR", error);
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
    axios
      .post("/lost-password", { email })
      .then(response => {
        console.log(response.data);
        commit("SET_SUCCESS", response.data.msg);
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  retrievePassword: ({ commit }, user) => {
    axios
      .post("/retrieve-password", user)
      .then(response => {
        console.log(response.data);
        commit("SET_SUCCESS", response.data.info);
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  getConnections: ({ commit }) => {
    axios
      .get("/my-connection")
      .then(response => {
        console.log(response.data);
        commit("LOAD_CONNECTIONS", response.data.connections);
      })
      .catch(error => {
        console.error(error);
        commit("SET_ERROR", error);
      });
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
