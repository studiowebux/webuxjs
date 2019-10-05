<template>
  <div class="mb-2">
    <div class="mt-5">
      <img src="/img/logo.png" alt="Logo" class="logo" />
    </div>
    <nav class="nav navbar-expand-md navbar bg-light mt-2">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav mx-auto nav-pills">
            <li class="nav-item" v-for="entry in entries" :key="entry.name">
              <template v-if="entry.auth && accessToken">
                <router-link
                  v-if="!entry.action"
                  class="nav-link"
                  :to="entry.to"
                >
                  {{ entry.name }}
                </router-link>
                <a v-else href="#" class="nav-link" @click="entry.action">
                  {{ entry.name }}
                </a>
              </template>

              <template v-if="!entry.auth && !accessToken">
                <router-link
                  v-if="!entry.action"
                  class="nav-link"
                  :to="entry.to"
                >
                  {{ entry.name }}
                </router-link>
                <a v-else href="#" class="nav-link" @click="entry.action">
                  {{ entry.name }}
                </a>
              </template>
            </li>
          </ul>
        </div>
      </div>
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
