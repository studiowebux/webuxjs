import http from "../../resources/axios";

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
  initCategory: ({ commit }) => {
    commit("IS_LOADING");
    http
      .get("/category")
      .then(response => {
        commit("INIT_CATEGORY", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      })
      .finally(() => {
        commit("DONE_LOADING");
      });
  },
  addCategory: ({ commit }, newCategory) => {
    http
      .post("/category", newCategory)
      .then(response => {
        commit("ADD_CATEGORY", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  removeCategory: ({ commit }, categoryID) => {
    http
      .delete("/category/" + categoryID)
      .then(() => {
        commit("REMOVE_CATEGORY", categoryID);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
      });
  },
  editCategory: ({ commit }, category) => {
    http
      .put("/category/" + category._id, category)
      .then(response => {
        commit("EDIT_CATEGORY", response.data.body);
        commit("RESET_ERROR");
      })
      .catch(error => {
        commit("SET_ERROR", error);
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
