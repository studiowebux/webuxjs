<template>
  <img v-if="link" :src="link" :alt="alt" />
  <div v-else>
    <spinner v-if="loading" />
    <h5 class="mt-2">{{ text }}</h5>
  </div>
</template>

<script>
import http from "../resources/http";
import Spinner from "./Spinner";

export default {
  name: "PartImage",
  components: {
    Spinner
  },
  props: {
    id: { type: String, required: true },
    alt: { type: String, required: true }
  },
  created() {
    this.loadImage();
  },
  data() {
    return { link: null, loading: true, text: "" };
  },
  methods: {
    loadImage() {
      http
        .get("/part/" + this.id + "/picture", {
          responseType: "arraybuffer"
        })
        .then(response => {
          const buffer = new Buffer(response.data, "binary").toString("base64");

          this.link =
            "data:" + response.headers["content-type"] + ";base64," + buffer;
        })
        .catch(() => {
          this.text = "No Picture";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
