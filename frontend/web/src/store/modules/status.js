import http from "../../resources/axios";

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
  DELETE_STATUS(state, statusID) {
    state.status.splice(statusID, 1);
  }
};

const actions = {
  initStatus: ({ commit }) => {
    http
      .get("/status")
      .then(response => {
        commit("INIT_STATUS", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  addStatus: ({ commit }, newStatus) => {
    http
      .post("/status", newStatus)
      .then(response => {
        commit("ADD_STATUS", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  deleteStatus: ({ commit }, statusID) => {
    commit("DELETE_STATUS", statusID);
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
