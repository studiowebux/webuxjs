<template>
  <div class="col-md-12">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" v-for="h in head" :key="h">{{h}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in rows" :key="line._id">
          <td v-for="h in head" :key="h">
            <span
              v-if="line[h]"
              :class="{dot: isColor(h)}"
              :style="[isColor(h) ? {'background-color': '#'+line[h]}: {}]"
            >{{isColor(h) ? '' : line[h]}}</span>
            <button v-else type="button" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    head: Array,
    rows: Object
  },
  methods: {
    isColor(h) {
      return h === "color";
    }
  }
};
</script>

<style lang="scss" scoped>
.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>

