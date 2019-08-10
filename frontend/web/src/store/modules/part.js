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
