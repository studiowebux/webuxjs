<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="viewPart"
    tabindex="-1"
    role="dialog"
    aria-labelledby="viewPartLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row" v-if="isLoading">
            <spinner></spinner>
          </div>
          <div v-else>
            <form @submit.prevent="Save" v-if="editing">
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
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick a status"
                    label="name"
                    track-by="_id"
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
                    v-model="part.categoriesID"
                    :options="arrCategory"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick categories"
                    label="name"
                    track-by="_id"
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

              <hr />

              <div class="form-group row">
                <label
                  for="partPicture"
                  class="col-sm-3 col-form-label form-control-lg mb-2"
                  >Picture</label
                >
                <div class="col-sm-9">
                  <upload :partID="partId"></upload>
                </div>
              </div>
            </form>

            <div class="row justify-content-center mt-3" v-if="!editing">
              <div
                class="card shadow-lg p-3 mb-5 bg-white rounded"
                style="width:90%"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ parts[partId].name }}</h5>
                  <p class="card-text lead">{{ parts[partId].description }}</p>
                  <hr />
                  <div class="row">
                    <div class="col-md-4 text-left">
                      <h5>Owner</h5>
                    </div>
                    <div class="col-md-8">
                      <p>
                        {{
                          parts[partId].userID && parts[partId].userID.profileID
                            ? parts[partId].userID.profileID.fullname
                            : "Profile not created yet"
                        }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 text-left">
                      <h5>Serial Number</h5>
                    </div>
                    <div class="col-md-8">
                      <p>{{ parts[partId].serialNumber }}</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 text-left">
                      <h5>Status</h5>
                    </div>
                    <div class="col-md-8">
                      <p>
                        {{
                          parts[partId].statusID
                            ? parts[partId].statusID.name
                            : "Unknown"
                        }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 text-left">
                      <h5>Categories</h5>
                    </div>
                    <div class="col-md-8">
                      <ul
                        v-if="
                          parts[partId].categoriesID &&
                            Object.keys(parts[partId].categoriesID).length > 0
                        "
                        class="list-inline"
                      >
                        <li
                          class="list-inline-item"
                          v-for="category of parts[partId].categoriesID"
                          :key="category._id"
                        >
                          <span class="badge badge-primary">{{
                            category.name
                          }}</span>
                        </li>
                      </ul>
                      <p v-else>No categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <Success />
        </div>
        <div class="row justify-content-center">
          <Error />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>

          <button
            type="button"
            class="btn btn-warning"
            v-if="editing && userID === parts[partId].userID._id"
            @click="isEditing()"
          >
            Cancel
          </button>

          <button
            class="btn btn-primary"
            v-if="!editing && userID === parts[partId].userID._id"
            @click.stop="isEditing()"
          >
            Edit
          </button>
          <submit
            v-if="editing && userID === parts[partId].userID._id"
            class="btn"
            text="Edit Part"
            :onClick="Save"
          ></submit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapGetters } from "vuex";
import Submit from "./Submit";
import Spinner from "./Spinner";
import Upload from "./Upload";
import Error from "./Error";
import Success from "./Success";

export default {
  props: {
    Edit: Function,
    partId: String
  },
  data() {
    return {
      editing: false,
      part: {
        name: "",
        description: "",
        serialNumber: "",
        statusID: "",
        categoriesID: [],
        userID: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.part = {
        name: "",
        description: "",
        serialNumber: "",
        statusID: "",
        categoriesID: []
      };
    },
    Save() {
      this.Edit(this.part);
      this.editing = false;
      return;
    },
    isEditing() {
      this.editing = !this.editing;
      const PART = Object.assign({}, this.parts[this.partId]); // the local part became equal to the props one.

      this.part.name = PART.name;
      this.part.description = PART.description;
      this.part.serialNumber = PART.serialNumber;
      this.part.statusID = { _id: PART.statusID._id, name: PART.statusID.name };
      this.part.categoriesID = PART.categoriesID
        ? Object.keys(PART.categoriesID).map(category => {
            return { _id: category, name: PART.categoriesID[category].name };
          })
        : [];
      this.part.userID = PART.userID._id;
    }
  },
  watch: {
    partId: function(newVal) {
      this.$store.dispatch("isLoading");
      this.$store.dispatch("resetSuccess");
      this.$socket.client.emit("findOnePart", newVal);
      this.resetForm();
      this.editing = false;
    }
  },
  created() {
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findOnePart", this.partId);
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
  components: {
    Multiselect,
    Submit,
    Spinner,
    Upload,
    Error,
    Success
  }
};
</script>
