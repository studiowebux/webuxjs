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
      <p>Enter your email address to get the instruction to reset your password.</p>
      <input type="email" v-model="email" name="email" id="email" class="form-control" />
      <Submit text="Send Instruction" :onClick="SendEmail"></Submit>
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
import Submit from "../components/Submit";
export default {
  data() {
    return {
      email: null
    };
  },
  computed: {
    ...mapGetters(["success_message", "error_message"])
  },
  methods: {
    ...mapActions(["lostPassword"]),
    SendEmail() {
      if (!this.email) {
        return;
      }
      this.lostPassword(this.email);
    }
  },
  components: {
    Submit
  }
};
</script>
