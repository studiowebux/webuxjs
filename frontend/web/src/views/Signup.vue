<template>
  <div class="container">
    <Error></Error>
    <div class="row justify-content-md-center">
      <form @keyup.enter="register">
        <div class="form-group">
          <input
            class="form-control form-control-lg mb-2"
            v-model="user.email"
            type="email"
            name="email"
            placeholder="example@webuxlab.com"
            required
          />
          <input
            class="form-control form-control-lg mb-2"
            v-model="user.password"
            @input="checkPassword()"
            type="password"
            name="password"
            id="password"
            placeholder="P@5sw0rd"
          />
          <input
            class="form-control form-control-lg mb-2"
            v-model="user.passwordCheck"
            @input="checkPassword()"
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            placeholder="P@5sw0rd"
          />
          <div v-if="invalid" class="alert alert-danger" role="alert">
            {{ invalid }}
          </div>

          <submit class="mb-2 mt-3" text="Sign up" :onClick="register"></submit>
        </div>
      </form>
      <router-link class="col-md-12" to="/signin"
        >Already Registered ?</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Submit from "../components/Submit";
import Error from "../components/Error";
import checkAuth from "../helpers/checkAuth";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordCheck: ""
      },
      invalid: null,
      isValid: true
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    register() {
      if (!this.user.email || !this.user.password) {
        return;
      }
      this.signUp(this.user);
    },
    checkPassword() {
      if (this.user.password !== this.user.passwordCheck) {
        this.invalid = "The password doesn't match";
        this.isValid = false;
        return;
      }
      this.invalid = null;
      this.isValid = true;
    }
  },
  components: {
    Submit,
    Error
  },
  created() {
    checkAuth();
  }
};
</script>
