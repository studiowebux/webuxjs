const state = {
  error_message: ""
};

const mutations = {
  SET_ERROR(state, error) {
    state.error_message = error;
  },
  RESET_ERROR(state) {
    state.error_message = "";
  }
};

const actions = {
  setError: ({ commit }, errorMSG) => {
    commit("SET_ERROR", errorMSG);
  },
  resetError: ({ commit }) => {
    commit("RESET_ERROR");
  }
};

const getters = {
  error_message: state => {
    return state.error_message;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
