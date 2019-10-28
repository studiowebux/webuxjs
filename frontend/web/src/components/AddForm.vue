<template>
  <div class="container justify-content-center actions shadow p-3 mb-2">
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
              <swatches
                v-model="newValue.color"
                show-fallback
                fallback-input-type="color"
                id="color"
              >
                <span
                  slot="trigger"
                  class="form__input__element dot"
                  readonly
                  :style="[{ 'background-color': newValue.color }]"
                ></span>
              </swatches>
            </div>

            <div class="col-md-2 col-sm-12 mb-2 justify-content-end">
              <button class="btn btn-success" @click.prevent="create()">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swatches from "vue-swatches";
import Error from "../components/Error";

export default {
  props: {
    create: Function,
    newValue: Object,
    header: String
  },
  components: {
    Swatches,
    Error
  },
  data() {
    return {
      hidden: false
    };
  }
};
</script>

<style lang="scss" scoped>
.dot {
  height: 40px;
  width: 40px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>
