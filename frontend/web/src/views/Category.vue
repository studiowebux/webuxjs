<template>
  <div class="container">
    <add-form
      :create="createCategory"
      header="Add New Category"
      :newValue="newCategory"
    ></add-form>
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
import AddForm from "../components/AddForm";
import { mapGetters /*mapActions*/ } from "vuex";

export default {
  name: "category",
  components: {
    wTable: Table,
    wSpinner: Spinner,
    AddForm
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
  mounted() {
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
