<template>
  <div id="app">
    <div class="container-fluid content">
      <w-menu :entries="entries" />
      <router-view />
    </div>

    <w-footer class="w-footer" />
  </div>
</template>

<script>
import Menu from "./components/layouts/Menu";
import Footer from "./components/layouts/Footer";
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
    wMenu: Menu,
    wFooter: Footer
  },
  methods: {
    ...mapActions(["logout"])
  },
  sockets: {
    connect() {
      console.log("Connection with socket.io server established");
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
}

.content {
  height: 100%;
  margin-bottom: auto;
  padding-bottom: 130px;
}

.w-footer {
  height: 130px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
