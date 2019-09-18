<template>
  <div>
    <div>
      <img src="/img/logo.png" alt="Logo" class="logo" />
    </div>
    <nav class="nav justify-content-center">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="entry in entries" :key="entry.name">
          <template v-if="entry.auth && accessToken">
            <router-link v-if="!entry.action" class="nav-link" :to="entry.to">{{
              entry.name
            }}</router-link>
            <a v-else href="#" class="nav-link" @click="entry.action">{{
              entry.name
            }}</a>
          </template>

          <template v-if="!entry.auth && !accessToken">
            <router-link v-if="!entry.action" class="nav-link" :to="entry.to">{{
              entry.name
            }}</router-link>
            <a v-else href="#" class="nav-link" @click="entry.action">{{
              entry.name
            }}</a>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "wmenu",
  props: {
    entries: Array
  },
  computed: {
    ...mapGetters(["accessToken"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  width: 50px;
}
</style>
