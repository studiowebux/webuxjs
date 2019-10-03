import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import socket from "./resources/socket";
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
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (profile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/Profile.vue"),
      meta: { isAuth: true }
    },
    {
      path: "/part",
      name: "part",
      // route level code-splitting
      // this generates a separate chunk (part.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "part" */ "./views/Part.vue"),
      meta: { isAuth: true }
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

const connectSocket = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Router - Open the socket connection");
      socket.open();

      if (store.getters.accessToken) {
        console.log("emit authentication with " + store.getters.accessToken);
        socket.emit("authentication", {
          accessToken: store.getters.accessToken
        });
        resolve();
      } else {
        console.log("*** The access token isn't available ***");
      }
    } catch (e) {
      throw e;
    }
  });
};

router.beforeEach(async (to, from, next) => {
  const checkAuth = () => {
    console.log(to);
    console.log(from);
    if (to.matched.some(record => record.meta.isAuth)) {
      console.log(
        "before entering in the route, check if the userID is present"
      );
      if (store.getters.userID) {
        console.log(
          "User id present, you are allowed to continue your journey !"
        );
        store.dispatch("resetMsg");
        next();
        return;
      }

      console.log(
        "User id not present, auth required to continue, please login"
      );
      next("/signin");
    } else {
      console.log("No Auth require");
      next();
    }
  };

  if (!store.getters.initialized) {
    store
      .dispatch("autoLogin")
      .then(() => {
        connectSocket()
          .then(() => {
            checkAuth();
            return;
          })
          .catch(e => {
            console.error(e);
            next("/signin");
            return;
          });
      })
      .catch(e => {
        console.error(e);
        checkAuth();
      });
  } else {
    checkAuth();
  }
});

export default router;
