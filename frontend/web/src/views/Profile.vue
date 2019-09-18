<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div
        v-if="error_message"
        class="col-md-4 col-sm-12 alert alert-danger"
        role="alert"
      >
        {{ error_message }}
        <font-awesome-icon
          icon="times-circle"
          class="float-right"
          @click="hide"
        />
      </div>
    </div>
    <div v-if="isLoading">
      <div class="row justify-content-md-center">
        <spinner></spinner>
      </div>
    </div>
    <div v-else-if="getProfile">
      <div class="row justify-content-md-center">
        <div class="card">
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
      </div>
    </div>
    <div v-else>
      <div class="row justify-content-md-center"></div>
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
import { mapGetters, mapActions } from "vuex";
import Submit from "../components/Submit";
import Spinner from "../components/Spinner";

export default {
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
      "error_message",
      "success_message",
      "isLoading",
      "doneLoading"
    ])
  },
  methods: {
    ...mapActions(["setError"]),
    hide() {
      this.$store.dispatch("setError", "");
    },
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
  components: {
    Submit,
    Spinner
  },
  created() {
    console.log(
      "Try to find my profile if exist, otherwise show to the user how to create a profile ..."
    );
    this.$store.dispatch("isLoading");
    this.$socket.client.emit("findOneProfile", this.accessToken);
  },
  sockets: {
    connect() {
      console.log("Profile - Socket.io connected");
    }
  }
};
</script>
