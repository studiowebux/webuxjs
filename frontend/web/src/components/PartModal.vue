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
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewPartLabel">{{ part.name }}</h5>
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
          <button @click="editing = !editing">Edit this entry</button>

          <form @submit.prevent="Edit" v-if="editing">
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

          <div class="row">
            <h1>{{ part.name }}</h1>
            <p>{{ part.descriptions }}</p>
            <p>{{ part.owner }}</p>
            <p>{{ part.serialNumber }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <submit class="btn" text="Edit Part" :onClick="Edit"></submit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapGetters } from "vuex";
export default {
  props: {
    Edit: Function,
    part: Object
  },
  data() {
    return {
      editing: false
    };
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
    Multiselect
  }
};
</script>
