<template>
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
                  :options="status"
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
                  v-model="part.categories"
                  :options="categories"
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
          </form>
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
          <submit class="btn" text="Create Part" :onClick="CreatePart"></submit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Submit from "./Submit";
import Error from "./Error";
import Success from "./Success";

export default {
  components: {
    Submit,
    Multiselect,
    Error,
    Success
  },
  props: {
    userID: String,
    categories: Array,
    status: Array
  },
  data() {
    return {
      part: {
        name: "",
        description: "",
        serialNumber: "",
        statusID: "",
        categories: []
      }
    };
  },
  methods: {
    CreatePart() {
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
    }
  }
};
</script>
