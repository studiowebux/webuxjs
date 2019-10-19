<template>
  <div class="container">
    <add-form
      :create="createStatus"
      header="Add New Status"
      :newValue="newStatus"
    ></add-form>
    <div class="row">
      <div class="col">
        <w-table
          :rows="status"
          :head="head"
          :remove="removeStatus"
          :edit="saveStatus"
          :editMode="editMode"
          v-if="Object.keys(status).length > 0 || !isLoading"
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

import { mapGetters } from "vuex";

export default {
  name: "status",
  components: {
    wTable: Table,
    wSpinner: Spinner,
    AddForm
  },
  methods: {
    createStatus() {
      const newStatus = {
        status: {
          name: this.newStatus.name,
          description: this.newStatus.description,
          color: this.newStatus.color.replace("#", "")
        }
      };
      // this.addStatus(newStatus);
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("createStatus", newStatus.status);
      this.newStatus.color = "#e66465";
      this.newStatus.name = "";
      this.newStatus.description = "";
    },
    saveStatus(line) {
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("updateStatus", line._id, {
        name: line.name,
        description: line.description,
        color: line.color.replace("#", "")
      });
    },
    removeStatus(id) {
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("removeStatus", id);
    }
  },
  computed: {
    ...mapGetters(["status", "isLoading"])
  },
  data() {
    return {
      head: ["name", "description", "color", "action"],
      formHidden: true,
      editMode: false,
      newStatus: {
        color: "#e66465",
        name: "",
        description: ""
      }
    };
  },
  created() {
    // this.initStatus(); to use the API call.
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findStatus");
  },
  sockets: {
    connect() {
      console.log("Socket connection -> status");
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
