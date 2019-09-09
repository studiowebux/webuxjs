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
    },
    {
      path: "/lost-password",
      name: "lost-password",
      // route level code-splitting
      // this generates a separate chunk (lost-password.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "lost-password" */ "./views/LostPassword.vue"
        )
    },
    {
      path: "/retrieve-password/:code",
      name: "retrieve-password",
      // route level code-splitting
      // this generates a separate chunk (retrieve-password.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "retrieve-password" */ "./views/RetrievePassword.vue"
        )
    },
    {
      path: "/user",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (user.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user" */ "./views/User.vue")
    },
    {
      path: "*",
      name: "not-found",
      // route level code-splitting
      // this generates a separate chunk (not-found.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "not-found" */ "./views/errors/NotFound.vue"
        )
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("autoLogin");
  store.dispatch("resetMsg");
  if (to.matched.some(record => record.meta.isAuth)) {
    console.log("before entering in the route, check if the userID is present");
    if (store.getters.userID) {
      console.log("User id present");
      next();
      return;
    }

    console.log("User id not present");
    next("/signin");
  } else {
    next();
  }
});

export default router;
