<template>
  <button type="submit" class="btn btn-primary mb-2" @click.prevent="onClick()" :disabled="isLoading">
    <spinner-button v-if="isLoading"></spinner-button>
    <span v-if="!isLoading">{{text}}</span>
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import SpinnerButton from "./SpinnerButton";

export default {
  computed: {
    ...mapGetters(["isLoading"])
  },
  props: {
    text: String,
    onClick: Function
  },
  components: {
    SpinnerButton
  }
};
</script>
