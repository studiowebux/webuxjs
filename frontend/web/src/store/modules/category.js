import http from "../../resources/http";

const state = {
  category: {}
};

const mutations = {
  INIT_CATEGORY(state, category) {
    state.category = category;
  },
  ADD_CATEGORY(state, category) {
    state.category = {
      ...state.category,
      [category._id]: category
    };
  },
  EDIT_CATEGORY(state, category) {
    const updCategory = { ...state.category };
    updCategory[category._id] = category;
    state.category = {
      ...updCategory
    };
  },
  REMOVE_CATEGORY(state, categoryID) {
    const category = { ...state.category };
    delete category[categoryID];
    state.category = category;
  }
};

const actions = {
  socket_categoryFound({ commit, dispatch }, data) {
    console.log("GET CATEGORIES - Using the socket");
    commit("INIT_CATEGORY", data);
    dispatch("doneLoading");
  },
  socket_categoryCreated({ commit, dispatch }, data) {
    console.log("CREATE CATEGORY - Using the socket");
    commit("ADD_CATEGORY", data);
    dispatch("doneLoading");
  },
  socket_categoryUpdated({ commit, dispatch }, data) {
    console.log("UPDATE CATEGORY - Using the socket");
    commit("EDIT_CATEGORY", data);
    dispatch("doneLoading");
  },
  socket_categoryRemoved({ commit, dispatch }, data) {
    console.log("REMOVE CATEGORY - Using the socket");
    commit("REMOVE_CATEGORY", data);
    dispatch("doneLoading");
  },
  initCategory: ({ commit, dispatch }) => {
    console.log("GET CATEGORIES - Using the API Call");
    dispatch("isLoading");
    http
      .get("/category")
      .then(response => {
        commit("INIT_CATEGORY", response.data.body);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  addCategory: ({ commit, dispatch }, newCategory) => {
    console.log("CREATE CATEGORY - Using the API Call");
    dispatch("isLoading");
    http
      .post("/category", newCategory)
      .then(response => {
        commit("ADD_CATEGORY", response.data.body);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  removeCategory: ({ commit, dispatch }, categoryID) => {
    console.log("REMOVE CATEGORY - Using the API Call");
    dispatch("isLoading");
    http
      .delete("/category/" + categoryID)
      .then(() => {
        commit("REMOVE_CATEGORY", categoryID);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  },
  editCategory: ({ commit, dispatch }, category) => {
    console.log("EDIT CATEGORY - Using the API Call");
    dispatch("isLoading");
    http
      .put("/category/" + category._id, category)
      .then(response => {
        commit("EDIT_CATEGORY", response.data.body);
      })
      .catch(error => {
        dispatch("setError", error);
      })
      .finally(() => {
        dispatch("doneLoading");
      });
  }
};

const getters = {
  category: state => {
    return state.category;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
