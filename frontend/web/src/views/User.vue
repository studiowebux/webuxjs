<template>
  <div class="container-fluid" v-if="getProfile">
    <div class="row"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getProfile"])
  },
  methods: {
    ...mapActions(["createProfile", "initProfile"])
  },
  created() {
    this.initProfile();
  }
};
</script>
