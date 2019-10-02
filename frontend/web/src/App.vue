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
import store from "./store";
import getCookies from "./resources/getCookies";

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
  async created() {
    console.log("App has been created");
    console.log("APP - Check cookie in app.vue");
    let accessToken = null;
    if (!store.getters.accessToken) {
      accessToken = await getCookies("accessToken").catch(e => {
        console.error(e);
      });
    } else {
      accessToken = store.getters.accessToken;
    }

    console.log("APP - accessToken value : ");
    console.log(accessToken);
    if (accessToken) {
      if (!store.getters.userID || !store.getters.accessToken) {
        console.log("Vuex isn't initialized, maybe a refresh occured");
        await store.dispatch("autoLogin").catch(() => {
          console.error("Maybe an infinite loop ?");
        });
        console.log("AUto login done !");
      }
      console.log("APP - Open the socket connection");
      socket.open();

      socket.emit("authentication", {
        accessToken: accessToken
      });

      socket.on("authenticated", data => {
        console.log("APP - Authenticated !!");
        console.log(data);
      });
    } else {
      console.error("APP - No access Token available");
    }
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
