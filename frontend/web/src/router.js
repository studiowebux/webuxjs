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
        import(/* webpackChunkName: "status" */ "./views/Status.vue"),
      meta: { isAuth: true }
    },
    {
      path: "/category",
      name: "category",
      // route level code-splitting
      // this generates a separate chunk (category.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "category" */ "./views/Category.vue"),
      meta: { isAuth: true }
    },
    {
      path: "/signin",
      name: "signin",
      // route level code-splitting
      // this generates a separate chunk (signin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "signin" */ "./views/Signin.vue")
    },
    {
      path: "/signup",
      name: "signup",
      // route level code-splitting
      // this generates a separate chunk (signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "signup" */ "./views/Signup.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("resetError");

  if (to.matched.some(record => record.meta.isAuth)) {
    if (store.getters.accessToken || window.$cookies.get("accessToken")) {
      next();
      return;
    }
    next("/signin");
  } else {
    next();
  }
});

export default router;
