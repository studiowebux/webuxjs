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
            @click.stop="goto(scope.suggestion._id)"
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
            <a
              href="#"
              class="btn btn-warning col-md-6"
              @click.prevent="DeletePart(part._id)"
            >
              <font-awesome-icon icon="trash-alt" />
            </a>
            <a
              href="#"
              class="btn btn-primary col-md-6"
              @click.prevent="ViewPart(part._id)"
              data-toggle="modal"
              data-target="#viewPart"
            >
              <font-awesome-icon icon="eye" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-else>
      <Error></Error>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="createPart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createPartLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createPartLabel">Create Part</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="CreatePart">
              <div class="form-group row">
                <label
                  for="partName"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Name</label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control form-control-lg mb-2"
                    v-model="part.name"
                    type="text"
                    name="partName"
                    id="partName"
                    placeholder="Something"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="partDescription"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Description</label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control form-control-lg mb-2"
                    v-model="part.description"
                    type="text"
                    name="partDescription"
                    id="partDescription"
                    placeholder="Something with more details"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="partSerialNumber"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Serial Number</label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control form-control-lg mb-2"
                    v-model="part.serialNumber"
                    type="text"
                    name="partSerialNumber"
                    id="partSerialNumber"
                    placeholder="A Serial Number"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="partStatus"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Status</label
                >
                <div class="col-sm-9">
                  <multiselect
                    v-model="part.statusID"
                    :options="arrStatus"
                    :multiple="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick a status"
                    label="name"
                    track-by="_id"
                    :preselect-first="true"
                  ></multiselect>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="partCategories"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Categories</label
                >
                <div class="col-sm-9">
                  <multiselect
                    v-model="part.categories"
                    :options="arrCategory"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick categories"
                    label="name"
                    track-by="_id"
                    :preselect-first="true"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.length && !isOpen"
                        >{{ values.length }} options selected</span
                      >
                    </template>
                  </multiselect>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <submit
              class="btn"
              text="Create Part"
              :onClick="CreatePart"
            ></submit>
          </div>
        </div>
      </div>
    </div>
    <part-modal
      v-if="selectedId"
      :Edit="EditPart"
      :partId="selectedId"
    ></part-modal>
  </div>
</template>

<script>
import VueSuggest from "vue-simple-suggest/lib";
import PartImage from "../components/PartImage";
import PartModal from "../components/PartModal";
import Error from "../components/Error";
import Submit from "../components/Submit";
import Spinner from "../components/Spinner";
import http from "../resources/http";
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";

export default {
  components: {
    VueSuggest,
    PartImage,
    PartModal,
    Error,
    Submit,
    Multiselect,
    Spinner
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
        categories: []
      }
    };
  },

  created() {
    console.log(
      "Try to find parts if any, otherwise show a big ADD button ..."
    );
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
            console.log("From our backend: ");
            console.log(response.data.body);

            resolve(
              Object.values(response.data.body).map(part => {
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
    },
    CreatePart() {
      console.log(this.part);
      const newPart = {
        name: this.part.name,
        description: this.part.description,
        serialNumber: this.part.serialNumber,
        statusID: this.part.statusID._id,
        categoriesID: this.part.categories.map(c => {
          return c._id;
        }),
        userID: this.userID
      };

      if (!this.part.name || !this.part.description) {
        return;
      }
      this.$socket.client.emit("createPart", newPart);
    },
    ViewPart(id) {
      console.log(id);
      this.selectedId = id;
      return;
    },
    EditPart() {
      console.log("Clicked save");
      console.log(this.part);
      this.$socket.client.emit("updatePart", this.part);
      return;
    },
    DeletePart(id) {
      this.$socket.client.emit("removePart", id);
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
