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
