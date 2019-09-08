import Vue from "vue";
import Vuex from "vuex";

import part from "./store/modules/part";
import category from "./store/modules/category";
import profile from "./store/modules/profile";
import status from "./store/modules/status";
import error from "./store/modules/error";
import auth from "./store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    part,
    category,
    profile,
    status,
    error,
    auth
  }
});
