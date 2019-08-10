import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/status",
      name: "status",
      // route level code-splitting
      // this generates a separate chunk (status.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "status" */ "./views/Status.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("resetError");
  next();
});

export default router;
