const state = {
  profile: null,
  profileInit: false
};

const mutations = {
  INIT_PROFILE(state, profile) {
    state.profile = profile;
    state.profileInit = true;
  }
};

const actions = {
  socket_profileFound: ({ commit, dispatch }, data) => {
    console.log("PROFILE FOUND");
    commit("INIT_PROFILE", data);
    dispatch("doneLoading");
  },
  socket_profileCreated: ({ commit, dispatch }, data) => {
    console.log("PROFILE Created");
    commit("INIT_PROFILE", data.profileID); // because the populate using mongoose wraps the user in profileID
    dispatch("doneLoading");
  },
  socket_profileUpdated: ({ commit, dispatch }, data) => {
    console.log("PROFILE Updated !");
    commit("INIT_PROFILE", data);
    dispatch("doneLoading");
  }
};

const getters = {
  getProfile: state => {
    return state.profile;
  },
  profileInit: state => {
    return state.profileInit;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
