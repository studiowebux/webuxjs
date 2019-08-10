<template>
  <div class="container">
    <div class="row justify-content-end actions">
      <div class="col-md-4">
        <div v-if="error_message" class="alert alert-danger" role="alert">{{error_message}}</div>
      </div>
      <div class="col-md-6">
        <form>
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Name" v-model="newStatus.name" />
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
        <button class="btn btn-success" @click="createStatus()">Add New Status</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <w-table :rows="status" :head="head" v-if="Object.keys(status).length > 0"></w-table>
        <w-spinner v-else></w-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table";
import Spinner from "../components/Spinner";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    wTable: Table,
    wSpinner: Spinner
  },
  methods: {
    ...mapActions(["initStatus", "addStatus"]),
    createStatus() {
      const newStatus = {
        status: {
          name: this.newStatus.name,
          description: this.newStatus.description,
          color: this.newStatus.color.replace("#", "")
        }
      };
      this.addStatus(newStatus);
      this.newStatus.color = "#e66465";
      this.newStatus.name = "";
      this.newStatus.description = "";
    }
  },
  computed: {
    ...mapGetters(["status", "error_message"])
  },
  data() {
    return {
      head: ["name", "description", "color", "action"],
      formHidden: true,
      newStatus: {
        color: "#e66465",
        name: "",
        description: ""
      }
    };
  },
  created() {
    this.initStatus();
  }
};
</script>

<style lang="scss" scoped>
.actions {
  padding: 5px;
  margin: 5px;
}
</style>
