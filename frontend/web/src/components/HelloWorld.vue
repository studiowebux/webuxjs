<template>
  <div class="hello">
    <h1>This is a Demo,</h1>
    <p>
      This project has been built with webux toolbox along with
      <a href="https://vuejs.org" target="_blank" rel="noopener">vueJS 2</a>.
    </p>
    <h3>Installed modules</h3>
    <ul>
      <li>@studiowebux/app</li>
      <li>@studiowebux/generator</li>
      <li>Docker</li>
      <li>And much more ...</li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://www.webuxlab.com" target="_blank" rel="noopener"
          >Webux Lab Documentation</a
        >
      </li>
      <li>
        <a
          href="https://www.github.com/studiowebux/webuxjs"
          target="_blank"
          rel="noopener"
          >Webux Lab Sources</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
