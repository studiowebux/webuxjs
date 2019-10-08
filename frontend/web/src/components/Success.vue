<template>
  <div v-if="success_message" class="alert alert-success" role="alert">
    {{ success_message }}
    <font-awesome-icon icon="times-circle" class="float-right" @click="Hide" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["success_message"])
  },
  methods: {
    ...mapActions(["resetSuccess"]),
    Hide() {
      this.resetSuccess();
    }
  }
};
</script>
