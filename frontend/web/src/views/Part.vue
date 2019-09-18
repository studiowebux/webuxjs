<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between mb-3">
      <a class="navbar-brand">Parts</a>
      <form class="form-inline">
        <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> -->
        <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        <autocomplete
          aria-label="Search Wikipedia"
          placeholder="Search Wikipedia"
          :search="search"
          :get-result-value="getResultValue"
          @submit="handleSubmit"
        >
          <template v-slot:result="{ result, props }">
            <li v-bind="props" class="autocomplete-result wiki-result">
              <div class="wiki-title">{{ result.title }}</div>
              <div class="wiki-snippet" v-html="result.snippet" />
            </li>
          </template>
        </autocomplete>
      </form>
    </nav>
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3" v-for="n in 10" :key="n">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Test #{{n}}</h5>
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
const wikiUrl = "https://en.wikipedia.org";
const wikiParams = "action=query&list=search&format=json&origin=*";
import Autocomplete from "@trevoreyre/autocomplete-vue";

export default {
  components: {
    Autocomplete
  },
  methods: {
    search(input) {
      return new Promise(resolve => {
        const url = `${wikiUrl}/w/api.php?${wikiParams}&srsearch=${encodeURI(
          input
        )}`;

        if (input.length < 3) {
          return resolve([]);
        }

        fetch(url)
          .then(response => response.json())
          .then(data => {
            resolve(data.query.search);
          });
      });
    },

    getResultValue(result) {
      return result.title;
    },

    handleSubmit(result) {
      window.open(`${wikiUrl}/wiki/${encodeURI(result.title)}`);
    }
  }
};
</script>

<style lang="css" scoped>
.wiki-result {
  border-top: 1px solid #eee;
  padding: 16px;
  background: transparent;
}

.wiki-title {
  font-size: 20px;
  margin-bottom: 8px;
}

.wiki-snippet {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}
</style>