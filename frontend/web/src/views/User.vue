<template>
  <div class="container-fluid" v-if="connections">
    <div class="row">
      <div class="col-md-12 table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Token</th>
              <th scope="col">Created at</th>
              <th scope="col">From</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="connection in connections" :key="connection.token">
              <th scope="row">{{connection.type}}</th>
              <td>{{connection.token}}</td>
              <td>{{connection.createdAt}}</td>
              <td>{{connection.from}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["connections"])
  },
  methods: {
    ...mapActions(["getConnections"])
  },
  created() {
    this.getConnections();
  }
};
</script>
