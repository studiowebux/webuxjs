<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between mb-3">
      <a class="navbar-brand">Parts</a>
      <form class="form-inline">
        <vue-suggest
          class="asdad"
          pattern="\w+"
          v-model="model"
          :list="getList"
          :max-suggestions="10"
          :min-length="3"
          :debounce="500"
          :filter-by-query="false"
          :prevent-submit="true"
          :controls="{
            selectionUp: [38, 33],
            selectionDown: [40, 34],
            select: [13, 36],
            hideList: [27, 35]
          }"
          :mode="mode"
          :nullable-select="true"
          ref="suggestComponent"
          placeholder="Search information..."
          value-attribute="_id"
          display-attribute="name"
          @select="onSuggestSelect"
          @request-start="onRequestStart"
          @request-done="onRequestDone"
          @request-failed="onRequestFailed"
        >
          <div class="g">
            <input type="text" />
          </div>

          <template slot="misc-item-above" slot-scope="{ suggestions, query }">
            <div class="misc-item">
              <span>You're searching for '{{ query }}'.</span>
            </div>

            <template v-if="suggestions.length > 0">
              <div class="misc-item">
                <span>{{ suggestions.length }} suggestions are shown...</span>
              </div>
              <hr />
            </template>

            <div class="misc-item" v-else-if="!loading">
              <span>No results</span>
            </div>
          </template>

          <div
            slot="suggestion-item"
            slot-scope="scope"
            :title="scope.suggestion.description"
            @click.stop="goto(scope.suggestion._id)"
          >
            <div class="text">
              <span v-html="boldenSuggestion(scope)"></span>
            </div>
          </div>

          <div
            class="misc-item"
            slot="misc-item-below"
            slot-scope="{ suggestions }"
            v-if="loading"
          >
            <span>Loading...</span>
          </div>
        </vue-suggest>
      </form>
    </nav>
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3" v-for="n in 10" :key="n">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Test #{{ n }}</h5>
            <p class="card-text">Some Texts</p>
            <a href="#" class="card-link">Action 1</a>
            <a href="#" class="card-link">Action 2</a>
            <a href="#" class="card-link">Action 3</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSuggest from "vue-simple-suggest/lib";
import http from "../resources/http";

export default {
  components: {
    VueSuggest
  },
  data() {
    return {
      selected: null,
      model: null,
      mode: "input",
      loading: false
    };
  },
  methods: {
    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(
        "<h5>" + suggestion.name + "</h5><p>" + suggestion.description + "</p>"
      );
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|\.]/gm).filter(t => !!t) || [""];
      return result.replace(
        new RegExp("(.*?)(" + texts.join("|") + ")(.*?)", "gi"),
        "$1<b>$2</b>$3"
      );
    },
    goto(url) {
      window.open(url, "_blank").focus();
    },
    onSuggestSelect(suggest) {
      this.selected = suggest;
    },
    onRequestStart() {
      this.loading = true;
    },
    onRequestDone() {
      this.loading = false;
    },
    onRequestFailed() {
      this.loading = false;
    },
    getList(inputValue) {
      return new Promise((resolve, reject) => {
        var re = new RegExp(".*" + inputValue.replace(/ /g, "\\s") + ".*", "i");
        const url =
          "/part?filter=name regex " + re + " OR description regex " + re;

        http
          .get(url)
          .then(response => {
            console.log("From our backend: ");
            console.log(response.data.body);

            resolve(
              Object.values(response.data.body).map(part => {
                console.log(part);
                return part;
              })
            );
          })
          .catch(e => {
            this.loading = false;
            console.error(e);
            reject(e);
          });
      });
    }
  }
};
</script>

<style lang="css">
.vue-simple-suggest.designed .suggestions {
  width: 400px !important;
  left: -100px !important;
}
.vue-simple-suggest .suggest-item .text {
  display: inline-block;
  line-height: 1;
  vertical-align: text-bottom;
  overflow: hidden;
  max-width: 90%;
  text-overflow: ellipsis;
}
.vue-simple-suggest .suggest-item .text span {
  white-space: nowrap;
}

.vue-simple-suggest-enter-active.suggestions,
.vue-simple-suggest-leave-active.suggestions {
  transition: opacity 0.2s;
}
.vue-simple-suggest-enter.suggestions,
.vue-simple-suggest-leave-to.suggestions {
  opacity: 0 !important;
}
</style>
