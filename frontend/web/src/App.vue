<template>
  <div id="app">
    <div class="container-fluid">
      <w-menu :entries="entries"></w-menu>
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";
import { mapActions } from "vuex";
import socket from "./resources/socket";
// import store from "./store";
// import getCookies from "./resources/getCookies";

export default {
  name: "app",
  data() {
    return {
      entries: [
        {
          name: "Home",
          to: "/",
          auth: false,
          action: false
        },
        {
          name: "Part",
          to: "/part",
          auth: true,
          action: false
        },
        {
          name: "Status",
          to: "/status",
          auth: true,
          action: false
        },
        {
          name: "Category",
          to: "/category",
          auth: true,
          action: false
        },
        {
          name: "Sign In",
          to: "/signin",
          auth: false,
          action: false
        },
        {
          name: "Sign Up",
          to: "/signup",
          auth: false,
          action: false
        },
        {
          name: "Profile",
          to: "/profile",
          auth: true,
          action: false
        },
        {
          name: "Logout",
          to: "/logout",
          auth: true,
          action: this.logout
        }
      ]
    };
  },
  components: {
    wMenu: Menu
  },
  methods: {
    ...mapActions(["logout"])
  },
  created() {
    socket.on("authenticated", data => {
      console.log("APP - Authenticated !!");
      console.log(data);
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
