import router from "../router";
import store from "../store";
import jwtDecode from "jwt-decode";

export default () => {
  const refreshToken = window.$cookies.get("refreshToken");
  const userID = window.$cookies.get("userID");

  if (refreshToken && userID) {
    if (store.getters.accessToken) {
      const decoded = jwtDecode(store.getters.accessToken);
      const now = Date.now() / 1000;
      if (now < decoded.exp) {
        console.log("Already connected !");
        console.log(
          "Next auto login will be in " +
            Math.ceil(decoded.exp - now) +
            " Seconds"
        );
        router.push("/").catch(() => {});
        return;
      } else {
        console.log("Token expired, we will ask for a new one");
      }
    }
    console.log("Try to refresh the access token");
    store.dispatch("refreshToken", { refreshToken, userID });
    router.push("/").catch(() => {});
    return;
  }
};
