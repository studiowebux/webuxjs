<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link v-if="accessToken" to="/status">Status</router-link>|
      <router-link v-if="accessToken" to="/category">Category</router-link>|
      <router-link v-if="!accessToken" to="/signin">Sign In</router-link>|
      <router-link v-if="!accessToken" to="/signup">Sign Up</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters(["accessToken"])
  },
  created() {
    console.log("created called")
    this.$store.dispatch("autoLogin");
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
