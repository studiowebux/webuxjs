const state = {
  status: {}
};

const mutations = {
  INIT_STATUS(state, status) {
    state.status = status;
  },
  ADD_STATUS(state, status) {
    state.status = {
      ...state.status,
      [status._id]: status
    };
  },
  EDIT_STATUS(state, status) {
    const updStatus = { ...state.status };
    updStatus[status._id] = status;
    state.status = {
      ...updStatus
    };
  },
  REMOVE_STATUS(state, statusID) {
    const status = { ...state.status };
    delete status[statusID];
    state.status = status;
  }
};

const actions = {
  socket_statusFound({ commit, dispatch }, data) {
    console.log("GET STATUS - Using the socket");
    commit("INIT_STATUS", data);
    dispatch("doneLoading");
  },
  socket_statusCreated({ commit, dispatch }, data) {
    console.log("CREATE STATUS - Using the socket");
    commit("ADD_STATUS", data);
    dispatch("doneLoading");
  },
  socket_statusUpdated({ commit, dispatch }, data) {
    console.log("UPDATE STATUS - Using the socket");
    commit("EDIT_STATUS", data);
    dispatch("doneLoading");
  },
  socket_statusRemoved({ commit, dispatch }, data) {
    console.log("REMOVE STATUS - Using the socket");
    commit("REMOVE_STATUS", data);
    dispatch("doneLoading");
  }
};

const getters = {
  status: state => {
    return state.status;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
