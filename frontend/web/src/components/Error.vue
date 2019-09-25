<template>
  <div class="row justify-content-md-center">
    <div v-if="error_message" class="alert alert-danger" role="alert">
      {{ error_message }}
      <font-awesome-icon
        icon="times-circle"
        class="float-right"
        @click="Hide"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["error_message"])
  },
  methods: {
    ...mapActions(["resetError"]),
    Hide() {
      this.resetError();
    }
  }
};
</script>
