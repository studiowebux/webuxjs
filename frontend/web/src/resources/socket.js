import Vue from "vue";
import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import store from "../store";

const options = { path: "/socket.io" };

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketio("http://localhost:1337", options)
    // vuex: {
    //   store,
    //   actionPrefix: "SOCKET_",
    //   mutationPrefix: "SOCKET_"
    // }
  })
);
