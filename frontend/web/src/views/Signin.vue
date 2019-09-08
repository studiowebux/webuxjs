<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div
        v-if="error_message"
        class="col-md-12 col-sm-12 alert alert-danger"
        role="alert"
      >{{error_message}}</div>
    </div>
    <div class="row justify-content-md-center">
      <form @keyup.enter="login">
        <div class="form-group col-md-12 col-sm-12">
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
          <submit text="Sign in" :onClick="login"></submit>
        </div>
      </form>
    </div>
    <div class="row justify-content-md-center">
      <router-link to="/lost-password">Lost password ?</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Submit from "../components/Submit";

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
    Submit
  },
  computed: {
    ...mapGetters(["error_message", "isLoading"])
  },
  methods: {
    ...mapActions(["signIn"]),
    login() {
      if (!this.user.email || !this.user.password) {
        return;
      }
      this.signIn(this.user);
    }
  }
};
</script>
