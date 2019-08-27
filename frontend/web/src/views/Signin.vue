<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div
        v-if="error_message"
        class="col-md-6 col-sm-12 alert alert-danger"
        role="alert"
      >{{error_message}}</div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-md-6 col-sm-12">
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
        <button type="submit" class="btn btn-primary mb-2" @click="login()">Sign in</button>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <router-link to="/lost-password">Lost password ?</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["error_message"])
  },
  methods: {
    ...mapActions(["signIn"]),
    login() {
      this.signIn(this.user);
    }
  }
};
</script>
