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
      <p>Enter your email address associated with the code to update your password.</p>
      <input type="email" v-model="email" name="email" id="email" class="form-control" />
      <input
        v-if="email"
        class="form-control form-control-lg mb-2"
        v-model="password"
        @input="checkPassword()"
        type="password"
        name="password"
        id="password"
        placeholder="P@5sw0rd"
      />
      <input
        v-if="email"
        class="form-control form-control-lg mb-2"
        v-model="passwordCheck"
        @input="checkPassword()"
        type="password"
        name="passwordCheck"
        id="passwordCheck"
        placeholder="P@5sw0rd"
      />
      <div v-if="invalid" class="alert alert-danger" role="alert">{{invalid}}</div>
      <br />
      <button @click="changePassword" class="btn btn-primary">Update Password</button>
    </div>
    <div class="row justify-content-md-center">
      <div
        class="col-md-6 col-sm-12 alert alert-success"
        role="alert"
        v-if="success_message"
      >{{success_message}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../router";

export default {
  data() {
    return {
      email: null,
      code: null,
      password: null,
      passwordCheck: null,
      invalid: false
    };
  },
  computed: {
    ...mapGetters(["success_message", "error_message"])
  },
  methods: {
    ...mapActions(["retrievePassword"]),
    changePassword() {
      this.retrievePassword({
        email: this.email,
        code: this.code,
        password: this.password
      });
    },
    checkPassword() {
      if (this.password !== this.passwordCheck) {
        this.invalid = "The password doesn't match";
        return;
      }
      this.invalid = null;
    }
  }
};
</script>
