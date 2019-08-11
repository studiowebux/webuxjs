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
  initStatus: ({ commit }) => {
    commit("IS_LOADING");
    http
      .get("/status")
      .then(response => {
        commit("INIT_STATUS", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      })
      .finally(() => {
        commit("DONE_LOADING");
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
  removeStatus: ({ commit }, statusID) => {
    http
      .delete("/status/" + statusID)
      .then(() => {
        commit("REMOVE_STATUS", statusID);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  editStatus: ({ commit }, status) => {
    http
      .put("/status/" + status._id, status)
      .then(response => {
        commit("EDIT_STATUS", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
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
