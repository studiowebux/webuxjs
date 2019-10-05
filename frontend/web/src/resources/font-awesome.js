import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faTimesCircle,
  faPlusCircle,
  faTrashAlt,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPencilAlt, faTimesCircle, faPlusCircle, faTrashAlt, faEye);

Vue.component("font-awesome-icon", FontAwesomeIcon);
