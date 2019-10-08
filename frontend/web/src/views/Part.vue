<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between mb-3">
      <a class="navbar-brand">Parts</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#createPart"
          >
            <font-awesome-icon icon="plus-circle" />
          </button>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
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
            <input id="search-input" placeholder="Search part" type="text" />
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
            @click.stop="goto('/part/' + scope.suggestion._id)"
          >
            <div class="text">
              <span v-html="boldenSuggestion(scope)"></span>
            </div>
          </div>

          <div class="misc-item" slot="misc-item-below" v-if="loading">
            <span>Loading...</span>
          </div>
        </vue-suggest>
      </form>
    </nav>
    <div v-if="Object.keys(part).length < 0 || isLoading">
      <spinner></spinner>
    </div>
    <div class="row" v-if="parts && Object.keys(parts).length > 0">
      <div class="col-md-4 col-sm-6 mb-3" v-for="part in parts" :key="part._id">
        <div class="card p-3 ma-10 shadow p-3 ma-6">
          <part-image :id="part._id" class="card-img-top" :alt="part.name" />
          <div class="card-body">
            <h5 class="card-title">{{ part.name }}</h5>
            <p class="card-text">{{ part.description }}</p>
            <p class="card-text">{{ part.serialNumber }}</p>
            <p class="card-text">
              {{ part.statusID ? part.statusID.name : "None" }}
            </p>
            <p class="card-text">
              {{
                part.userID && part.userID.profileID
                  ? part.userID.profileID.fullname
                  : "Profile not created yet"
              }}
            </p>
            <div class="row justify-content-center">
              <button
                v-if="part.userID._id === userID"
                class="btn btn-danger col-md-4"
                @click="selectedId = part._id"
                data-toggle="modal"
                data-target="#deleteModal"
              >
                <font-awesome-icon icon="trash-alt" />
              </button>
              <button
                class="btn btn-primary col-md-4"
                :class="part.userID._id === userID ? 'offset-md-4' : ''"
                @click.prevent="ViewPart(part._id)"
                data-toggle="modal"
                data-target="#viewPart"
              >
                <font-awesome-icon icon="eye" />
                <span v-if="part.userID._id === userID">/</span>
                <font-awesome-icon
                  v-if="part.userID._id === userID"
                  icon="pencil-alt"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <Error></Error>
    </div>

    <!-- Modals -->
    <create-part
      :userID="userID"
      :categories="arrCategory"
      :status="arrStatus"
    />
    <part-modal v-if="selectedId" :Edit="EditPart" :partId="selectedId" />
    <delete-confirm :Delete="DeletePart" :selectedId="selectedId" />
  </div>
</template>

<script>
import VueSuggest from "vue-simple-suggest/lib";
import PartImage from "../components/PartImage";
import PartModal from "../components/PartModal";
import DeleteConfirm from "../components/DeleteConfirm";
import CreatePart from "../components/CreatePart";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import http from "../resources/http";
import { mapGetters } from "vuex";

export default {
  components: {
    VueSuggest,
    PartImage,
    PartModal,
    Error,
    Spinner,
    CreatePart,
    DeleteConfirm
  },
  data() {
    return {
      selected: null,
      model: null,
      mode: "input",
      loading: false,
      value: null,
      selectedId: null,
      part: {
        name: "",
        description: "",
        serialNumber: "",
        statusID: "",
        categoriesID: []
      }
    };
  },

  created() {
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findPart");
    this.$socket.client.emit("findCategory");
    this.$socket.client.emit("findStatus");
  },
  sockets: {
    connect() {
      console.log("Part - Socket.io connected");
    }
  },
  computed: {
    ...mapGetters([
      "parts",
      "success_message",
      "isLoading",
      "doneLoading",
      "arrCategory",
      "arrStatus",
      "userID"
    ])
  },
  methods: {
    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(suggestion);
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|.]/gm).filter(t => !!t) || [""];
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
            resolve(
              Object.values(response.data.body).map(part => {
                return part;
              })
            );
          })
          .catch(e => {
            this.loading = false;
            reject(e);
          });
      });
    },
    ViewPart(id) {
      this.selectedId = id;
      return;
    },
    EditPart(part) {
      const PART = {
        statusID: (part.statusID =
          part.statusID && typeof part.statusID === "object"
            ? part.statusID._id
            : part.statusID),
        categoriesID: (part.categoriesID =
          part.categoriesID && part.categoriesID.length > 0
            ? Object.values(part.categoriesID).map(category => {
                return category._id;
              })
            : []),
        name: part.name,
        description: part.description,
        serialNumber: part.serialNumber,
        userID: part.userID
      };
      this.$socket.client.emit("updatePart", this.selectedId, PART);

      return;
    },
    DeletePart(id) {
      this.$socket.client.emit("removePart", id);
      this.selectedId = null;
      return;
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

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
