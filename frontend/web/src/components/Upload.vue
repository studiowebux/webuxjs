<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <input
          class="btn btn-light"
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </div>
      <div class="col-md-4">
        <button class="btn btn-success" v-on:click="submitFile()">
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../resources/http";
import store from "../store";

export default {
  props: {
    partID: String
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("picture", this.file);

      if (!this.partID) {
        return;
      }

      http
        .post("/part/" + this.partID, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          store.dispatch("setSuccess", response.data.message);
          //store.dispatch("updatePart", response.data.body);
        })
        .catch(e => {
          store.dispatch("setError", e);
        });
    }
  },
  data() {
    return {
      file: ""
    };
  }
};
</script>
