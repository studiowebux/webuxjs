<template>
  <div class="container">
    <Error></Error>
    <div v-if="isLoading" class="row justify-content-center">
      <div class="col">
        <spinner></spinner>
      </div>
    </div>
    <!-- <div v-else-if="getProfile" class="row justify-content-center">
      <div class="card p-3 ma-10 shadow p-3 ma-6 col-6">
        <div class="card-body">
          <h5 class="card-title">My Profile</h5>
          <template v-if="!editing">
            <p class="card-text">Your Fullname: {{ getProfile.fullname }}</p>
            <p class="card-text">Your Role: Not implemented yet</p>
            <button
              class="btn btn-primary"
              @click="editMode"
              :disabled="isLoading"
            >
              Edit
            </button>
          </template>

          <template v-else>
            <p class="card-text">
              <label for="fullname">Your Fullname</label>
              <input
                name="fullname"
                type="text"
                class="form-control"
                v-model="fullname"
                required
              />
            </p>
            <button
              @click="updateProfile"
              class="btn btn-success"
              :disabled="isLoading"
            >
              Save
            </button>
          </template>
        </div>
      </div>
    </div> -->
    <div v-else class="row justify-content-center">
      <h1>Create my profile</h1>
      <form>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <label for="fullname">Your Fullname</label>
            <input
              name="fullname"
              type="text"
              class="form-control"
              placeholder="Fullname"
              v-model="fullname"
              required
            />
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6">
            <submit class="m-5" text="Save" :onClick="createProfile"></submit>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Submit from "../components/Submit";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

export default {
  name: "profile",
  data() {
    return {
      fullname: "",
      editing: false
    };
  },
  computed: {
    ...mapGetters([
      "getProfile",
      "accessToken",
      "success_message",
      "isLoading",
      "doneLoading"
    ])
  },
  methods: {
    createProfile() {
      if (!this.fullname) {
        return;
      }
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("createProfile", {
        fullname: this.fullname,
        accessToken: this.accessToken
      });
    },
    editMode() {
      this.editing = !this.editing;
      this.fullname = this.getProfile.fullname;
    },
    updateProfile() {
      if (!this.fullname) {
        this.editing = !this.editing;
        return;
      }

      this.$store.dispatch("isLoading");
      this.$socket.client.emit("updateProfile", {
        fullname: this.fullname,
        accessToken: this.accessToken
      });

      this.editing = false;
    }
  },
  sockets: {
    connect() {
      console.log("Profile - Socket.io connected");
    },
    profileFound(data) {
      console.log(data);
    }
  },
  components: {
    Submit,
    Spinner,
    Error
  },
  mounted() {
    if (!this.$store.getters.profileInit) {
      console.log("called !");
      this.$store.dispatch("isLoading");
      this.$socket.client.emit("findOneProfile", this.accessToken);
    }
  }
};
</script>
