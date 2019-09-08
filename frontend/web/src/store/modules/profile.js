import http from "../../resources/axios";

const state = {
  profile: {}
};

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  }
};

const actions = {
  setProfile: ({ commit }, profile) => {
    commit("SET_PROFILE", profile);
  },
  createProfile: ({ commit, dispatch }, profile) => {
    dispatch("isLoading");
    http
      .post("/profile", { profile })
      .then(response => {
        commit("SET_PROFILE", response.data.profile);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  }
};

const getters = {
  getProfile: state => {
    return state.profile;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
