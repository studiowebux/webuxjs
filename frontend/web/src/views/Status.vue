<template>
  <div class="container">
    <div class="row justify-content-end actions">
      <div class="col-md-4">
        <div v-if="error_message" class="alert alert-danger" role="alert">
          {{ error_message }}
        </div>
      </div>
      <div class="col-md-6">
        <form>
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="newStatus.name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="newStatus.description"
              />
            </div>
            <div class="col">
              <input
                type="color"
                class="form-control"
                id="color"
                name="color"
                v-model="newStatus.color"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-2">
        <button class="btn btn-success" @click="createStatus()">
          Add New Status
        </button>
      </div>
    </div>
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
import { mapGetters } from "vuex";

export default {
  name: "status",
  components: {
    wTable: Table,
    wSpinner: Spinner
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
      const updStatus = {
        _id: line._id,
        status: {
          name: line.name,
          description: line.description,
          color: line.color.replace("#", "")
        }
      };
      // this.editStatus(updStatus);
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("updateStatus", updStatus);
    },
    removeStatus(id) {
      console.log(id);
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("removeStatus", id);
    }
  },
  computed: {
    ...mapGetters(["status", "error_message", "isLoading"])
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
    console.log("try to retrieve the status");
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
