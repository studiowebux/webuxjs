<template>
  <div class="container justify-content-md-center actions shadow p-3 mb-2">
    <div class="row">
      <h5 class="col-md-10">{{ header }}</h5>
      <div class="col-md-2 pull-right">
        <button class="btn btn-light" @click="hidden = !hidden">
          <font-awesome-icon v-if="hidden" icon="eye" />
          <font-awesome-icon v-else icon="eye-slash" />
        </button>
      </div>
    </div>
    <div class="row mt-2" v-if="!hidden">
      <Error class="col-md-3"></Error>
      <div class="col-md-9">
        <form>
          <div class="row">
            <div class="col-md-3 col-sm-12 mb-2">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="newValue.name"
              />
            </div>
            <div class="col-md-5 col-sm-12 mb-2">
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="newValue.description"
              />
            </div>
            <div class="col-md-2 col-sm-12 mb-2">
              <input
                type="color"
                class="form-control"
                id="color"
                name="color"
                v-model="newValue.color"
              />
            </div>

            <div class="col-md-2 col-sm-12 mb-2 justify-content-end">
              <button class="btn btn-success" @click="create()">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "../components/Error";

export default {
  props: {
    create: Function,
    newValue: Object,
    header: String
  },
  components: {
    Error
  },
  data() {
    return {
      hidden: false
    };
  }
};
</script>
