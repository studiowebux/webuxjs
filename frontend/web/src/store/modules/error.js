const state = {
  error_message: "",
  isLoading: false
};

const mutations = {
  SET_ERROR(state, error) {
    state.error_message = error;
  },
  RESET_ERROR(state) {
    state.error_message = "";
  },
  IS_LOADING(state) {
    state.isLoading = true;
  },
  DONE_LOADING(state) {
    state.isLoading = false;
  }
};

const actions = {
  setError: ({ commit }, errorMSG) => {
    commit("SET_ERROR", errorMSG);
  },
  resetError: ({ commit }) => {
    commit("RESET_ERROR");
  },
  isLoading: ({ commit }) => {
    commit("IS_LOADING");
  },
  doneLoading: ({ commit }) => {
    commit("DONE_LOADING");
  }
};

const getters = {
  error_message: state => {
    return state.error_message;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
