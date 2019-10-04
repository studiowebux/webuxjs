import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io-extended";
import Vue from "vue";
import store from "../store";

let URL = process.env.VUE_APP_IO_URL || "http://127.0.0.1:1337";

const options = { transports: ["websocket"], autoConnect: false };

let socket = SocketIO(URL, options);

Vue.use(VueSocketIO, socket, {
  store,
  actionPrefix: "socket_",
  eventToActionTransformer: str => {
    return str;
  }
});

export default socket;
