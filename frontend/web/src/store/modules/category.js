const state = {
  categories: {}
};

const mutations = {
  INIT_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  ADD_CATEGORY(state, category) {
    state.categories.push(category);
  },
  DELETE_CATEGORY(state, categoryID) {
    state.categories.splice(categoryID, 1);
  }
};

const actions = {
  initCategories: ({ commit }, categories) => {
    commit("INIT_CATEGORIES", categories);
  },
  addCategory: ({ commit }, category) => {
    commit("ADD_CATEGORY", category);
  },
  deleteCategory: ({ commit }, categoryID) => {
    commit("DELETE_CATEGORY", categoryID);
  }
};

const getters = {
  categories: state => {
    return state.categories;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
