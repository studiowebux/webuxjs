<template>
  <div class="container">
    <Error></Error>
    <div class="row justify-content-center">
      <form @keyup.enter.prevent="SendEmail" class="col-md-6 col-sm-12">
        <p>
          Enter your email address to get the instruction to reset your
          password.
        </p>
        <input
          type="email"
          v-model="email"
          name="email"
          id="email"
          class="form-control"
        />
        <Submit
          class="mt-3"
          text="Send Instruction"
          :onClick="SendEmail"
        ></Submit>
      </form>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md-6 col-sm-12 alert alert-success"
        role="alert"
        v-if="success_message"
      >
        {{ success_message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Submit from "../components/Submit";
import Error from "../components/Error";

export default {
  data() {
    return {
      email: null
    };
  },
  computed: {
    ...mapGetters(["success_message"])
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
    Submit,
    Error
  }
};
</script>
