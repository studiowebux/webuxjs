import router from "../router";
import store from "../store";
import jwtDecode from "jwt-decode";
import getCookies from "../resources/getCookies";

export default async () => {
  const refreshToken = await getCookies("refreshToken").catch(() => {
    store.dispatch("logout");
  });
  const userID = await getCookies("userID").catch(() => {
    store.dispatch("logout");
  });

  // if the cookie are presents
  if (refreshToken && userID) {
    // if vuex contains the accesstoken
    if (store.getters.accessToken) {
      // trying to decode the token
      const decoded = jwtDecode(store.getters.accessToken);
      const now = Date.now() / 1000;
      // check if the token is still valid
      if (now < decoded.exp) {
        router.push("/").catch(() => {});
        return;
      }
    }

    // the cookies are there, but the access token is expired.
    store.dispatch("refreshToken", { refreshToken, userID });
    router.push("/").catch(() => {});
    return;
  }
};
