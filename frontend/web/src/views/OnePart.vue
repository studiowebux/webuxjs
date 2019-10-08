<template>
  <div class="container">
    <div v-if="isLoading" class="row justify-content-center">
      <div class="col">
        <spinner></spinner>
      </div>
    </div>
    <div
      class="row justify-content-center mt-3"
      v-if="parts && Object.keys(parts).length > 0"
    >
      <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width:90%">
        <div class="card-body">
          <h5 class="card-title">{{ parts[partId].name }}</h5>
          <p class="card-text lead">{{ parts[partId].description }}</p>
          <hr />
          <div class="row">
            <div class="col-md-4 text-left">
              <h5>Owner</h5>
            </div>
            <div class="col-md-8">
              <p>
                {{
                  parts[partId].userID && parts[partId].userID.profileID
                    ? parts[partId].userID.profileID.fullname
                    : "Profile not created yet"
                }}
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 text-left">
              <h5>Serial Number</h5>
            </div>
            <div class="col-md-8">
              <p>{{ parts[partId].serialNumber }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 text-left">
              <h5>Status</h5>
            </div>
            <div class="col-md-8">
              <p>
                {{
                  parts[partId].statusID
                    ? parts[partId].statusID.name
                    : "Unknown"
                }}
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 text-left">
              <h5>Categories</h5>
            </div>
            <div class="col-md-8">
              <ul
                v-if="
                  parts[partId].categoriesID &&
                    Object.keys(parts[partId].categoriesID).length > 0
                "
                class="list-inline"
              >
                <li
                  class="list-inline-item"
                  v-for="category of parts[partId].categoriesID"
                  :key="category._id"
                >
                  <span class="badge badge-primary">{{ category.name }}</span>
                </li>
              </ul>
              <p v-else>No categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from "../components/Spinner";

export default {
  components: {
    Spinner
  },
  computed: {
    ...mapGetters(["parts", "isLoading"]),
    partId: function() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findOnePart", this.$route.params.id);
  },

  sockets: {
    connect() {
      console.log("One Part socket connected");
    }
  }
};
</script>
