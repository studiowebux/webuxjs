<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div v-if="error_message" class="alert alert-danger" role="alert">{{error_message}}</div>
    </div>
    <div class="row justify-content-md-center">
      <form>
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
          <div v-if="invalid" class="alert alert-danger" role="alert">{{invalid}}</div>
          <br />
          <submit text="Sign up" :onClick="register" :disabled="!isValid"></submit>
        </div>
      </form>
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
        password: "",
        passwordCheck: ""
      },
      invalid: null,
      isValid: true
    };
  },
  computed: {
    ...mapGetters(["error_message"])
  },
  methods: {
    ...mapActions(["signUp"]),
    register() {
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
    Submit
  }
};
</script>
