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
          to: "/user",
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
    console.log("App has been created + call autologin");
  },
  sockets: {
    connect() {
      console.log("Try to connect");
      console.log(this.$store);
      if (this.$store.getters.userID) {
        this.$socket.emit("authentication", {
          accessToken: window.$cookies.get("accessToken")
        });
      } else {
        console.log("Unable to connect");
      }
    },
    authenticated() {
      console.log("User authorized to use the socket");
      this.$socket.emit("findCategory");
      this.$socket.on("categoryFound", categories => {
        console.log(categories);
      });
      this.$socket.emit("categoryFind");
      this.$socket.emit("findCategories");
    },
    unauthorized(err) {
      console.error("There was an error with the authentication:", err.message);
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
