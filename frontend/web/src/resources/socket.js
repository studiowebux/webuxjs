import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io-extended";
import Vue from "vue";
import store from "../store";

let URL = process.env.VUE_APP_IO_URL || "http://192.168.10.50:1337";
let path = process.env.VUE_APP_IO_PATH || "/socket.io";

const options = { path, transports: ["websocket"], autoConnect: false };

const socket = SocketIO(URL, options);

Vue.use(VueSocketIO, socket, {
  store,
  actionPrefix: "socket_",
  eventToActionTransformer: str => {
    return str;
  }
});

export default socket;
