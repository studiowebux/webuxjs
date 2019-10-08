const state = {
  parts: {}
};

const mutations = {
  INIT_PARTS(state, part) {
    state.parts = part;
  },
  ADD_PART(state, part) {
    state.parts = {
      ...state.parts,
      [part._id]: part
    };
  },
  EDIT_PART(state, part) {
    const updPart = { ...state.parts };
    updPart[part._id] = part;
    state.parts = {
      ...updPart
    };
  },
  REMOVE_PART(state, partID) {
    let part = { ...state.parts };
    delete part[partID];
    state.parts = part;
  },
  GET_ONE(state, part) {
    state.parts[part._id] = part;
  }
};

const actions = {
  socket_partFound({ commit, dispatch }, data) {
    console.log("GET PARTS - Using the socket");
    commit("INIT_PARTS", data);
    dispatch("doneLoading");
  },

  socket_partOneFound({ commit, dispatch }, data) {
    console.log("GET ONE PART - Using the socket");
    commit("GET_ONE", data);
    dispatch("doneLoading");
  },
  socket_partCreated({ commit, dispatch }, data) {
    console.log("CREATE PART - Using the socket");
    // TODO : the user fullname must be mapped properly
    commit("ADD_PART", data);
    dispatch("doneLoading");
    dispatch("setSuccess", "Part successfully added");
  },
  socket_partUpdated({ commit, dispatch }, data) {
    console.log("UPDATE PART - Using the socket");
    commit("EDIT_PART", data);
    dispatch("doneLoading");
    dispatch("setSuccess", "Part successfully updated");
  },
  socket_partRemoved({ commit, dispatch }, data) {
    console.log("REMOVE PART - Using the socket");
    commit("REMOVE_PART", data._id);
    dispatch("doneLoading");
  },
  initParts: ({ commit }, parts) => {
    commit("INIT_PARTS", parts);
  },
  addPart: ({ commit }, parts) => {
    commit("ADD_PART", parts);
  },
  updatePart: ({ commit }, part) => {
    commit("EDIT_PART", part);
  },
  deletePart: ({ commit }, partID) => {
    commit("DELETE_PART", partID);
  }
};

const getters = {
  parts: state => {
    return state.parts;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
