<template>
  <div class="container">
    <div class="row justify-content-end actions">
      <Error></Error>
      <div class="col-md-6">
        <form>
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Name" v-model="newCategory.name" />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="newCategory.description"
              />
            </div>
            <div class="col">
              <input
                type="color"
                class="form-control"
                id="color"
                name="color"
                v-model="newCategory.color"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-2">
        <button class="btn btn-success" @click="createCategory()">Add New Category</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <w-table
          :rows="category"
          :head="head"
          :remove="removeCategory"
          :edit="saveCategory"
          :editMode="editMode"
          v-if="Object.keys(category).length > 0 || !isLoading"
        ></w-table>
        <w-spinner v-else></w-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { mapGetters /*mapActions*/ } from "vuex";

export default {
  name: "category",
  components: {
    wTable: Table,
    wSpinner: Spinner,
    Error
  },
  methods: {
    // ...mapActions([
    //   // "initCategory",
    //   "addCategory",
    //   "removeCategory",
    //   "editCategory"
    // ]),
    createCategory() {
      const newCategory = {
        category: {
          name: this.newCategory.name,
          description: this.newCategory.description,
          color: this.newCategory.color.replace("#", "")
        }
      };

      this.$store.dispatch("isLoading");
      this.$socket.client.emit("createCategory", newCategory.category);
      // this.addCategory(newCategory);
      this.newCategory.color = "#e66465";
      this.newCategory.name = "";
      this.newCategory.description = "";
    },
    saveCategory(line) {
      const updCategory = {
        _id: line._id,
        category: {
          name: line.name,
          description: line.description,
          color: line.color.replace("#", "")
        }
      };
      //this.editCategory(updCategory);

      this.$store.dispatch("isLoading");
      this.$socket.client.emit(
        "updateCategory",
        updCategory._id,
        updCategory.category
      );
    },
    removeCategory(id) {
      console.log(id);
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("removeCategory", id);
    }
  },
  computed: {
    ...mapGetters(["category", "isLoading"])
  },
  data() {
    return {
      head: ["name", "description", "color", "action"],
      formHidden: true,
      editMode: false,
      newCategory: {
        color: "#e66465",
        name: "",
        description: ""
      }
    };
  },
  created() {
    // this.initCategory(); to use the API call.
    console.log("try to retrieve the categories");
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findCategory");
  },
  sockets: {
    connect() {
      console.log("Socket connection -> category");
    }
  }
};
</script>

<style lang="scss" scoped>
.actions {
  padding: 5px;
  margin: 5px;
}
</style>
