<template>
  <div class="col-md-12">
    <table class="table table-striped shadow">
      <thead>
        <tr>
          <th scope="col" v-for="h in head" :key="h">{{h}}</th>
        </tr>
      </thead>
      <transition-group name="slide" mode="out-in" :tag="'tbody'">
        <tr v-for="(line, index) in rows" :key="line._id">
          <td v-for="h in head" :key="h">
            <div class="content" v-if="h !== 'action'">
              <span
                 @click="setEditMode(index)"
                v-if="!isEditMode(index)"
                :class="{dot: isColor(h)}"
                :style="[isColor(h) ? {'background-color': '#'+line[h]}: {}]"
              >{{isColor(h) ? '' : line[h]}}</span>
              <input v-else type="text" v-model="line[h]" />
            </div>
            <div class="actions" v-else>
              <button
                v-if="!isEditMode(index)"
                type="button"
                class="btn btn-danger"
                @click="remove(line._id)"
              >Remove</button>
              <button v-else type="button" class="btn btn-primary" @click="save(line)">Save</button>
            </div>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    head: Array,
    rows: Object,
    remove: Function,
    edit: Function,
    editMode: Boolean
  },
  methods: {
    isColor(h) {
      return h === "color";
    },
    setEditMode(index) {
      this.mode = !this.mode;
      this.index = index;
    },
    save(line) {
      this.edit(line);
      this.setEditMode(null);
    },
    isEditMode(index) {
      if (index !== this.index) {
        return false;
      }
      return this.mode;
    }
  },
  data() {
    return {
      mode: this.editMode,
      index: null
    };
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

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
    opacity: 1;
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}
</style>

