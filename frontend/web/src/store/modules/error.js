const state = {
  error_message: "",
  success_message: "",
  isLoading: false
};

const mutations = {
  SET_ERROR(state, error) {
    state.error_message = error;
  },
  SET_SUCCESS(state, success) {
    state.success_message = success;
  },
  RESET_MSG(state) {
    state.error_message = "";
    state.success_message = "";
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
  setSuccess: ({ commit }, successMSG) => {
    commit("SET_SUCCESS", successMSG);
  },
  resetMsg: ({ commit }) => {
    commit("RESET_MSG");
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
  success_message: state => {
    return state.success_message;
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
