<template>
  <div class="container">
    <Error></Error>
    <div class="row justify-content-center">
      <form @keyup.enter="login" class="col-md-6 col-sm-12">
        <div class="form-group">
          <input
            class="form-control form-control-lg mb-2"
            v-model="user.email"
            type="email"
            name="email"
            placeholder="example@webuxlab.com"
          />
          <input
            class="form-control form-control-lg mb-2"
            v-model="user.password"
            type="password"
            name="password"
            id="password"
            placeholder="P@5sw0rd"
          />
          <submit class="mb-2 mt-3" text="Sign in" :onClick="login"></submit>
        </div>
      </form>
    </div>
    <div class="row justify-content-center">
      <router-link class="col-md-12" to="/lost-password"
        >Lost Password ?</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Submit from "../components/Submit";
import Error from "../components/Error";
import checkAuth from "../helpers/checkAuth";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    Submit,
    Error
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
  methods: {
    ...mapActions(["signIn"]),
    login() {
      if (!this.user.email || !this.user.password) {
        return;
      }
      this.signIn(this.user);
    }
  },
  created() {
    console.log("Sign in created !");
    checkAuth();
  }
};
</script>
