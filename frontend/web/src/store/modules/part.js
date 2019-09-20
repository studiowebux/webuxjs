const state = {
  parts: {}
};

const mutations = {
  INIT_PARTS(state, parts) {
    state.parts = parts;
  },
  ADD_PART(state, part) {
    state.parts.push(part);
  },
  DELETE_PART(state, partsID) {
    state.parts.splice(partsID, 1);
  }
};

const actions = {
  socket_partFound({ commit, dispatch }, data) {
    console.log("GET PARTS - Using the socket");
    commit("INIT_PARTS", data);
    dispatch("doneLoading");
  },
  socket_partCreated({ commit, dispatch }, data) {
    console.log("CREATE PART - Using the socket");
    commit("ADD_PART", data);
    dispatch("doneLoading");
  },
  socket_partUpdated({ commit, dispatch }, data) {
    console.log("UPDATE PART - Using the socket");
    commit("EDIT_PART", data);
    dispatch("doneLoading");
  },
  socket_partRemoved({ commit, dispatch }, data) {
    console.log("REMOVE PART - Using the socket");
    commit("REMOVE_PART", data);
    dispatch("doneLoading");
  },
  initParts: ({ commit }, parts) => {
    commit("INIT_PARTS", parts);
  },
  addPart: ({ commit }, parts) => {
    commit("ADD_PART", parts);
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
