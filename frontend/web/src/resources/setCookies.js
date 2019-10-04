function setCookies(accessToken = null, refreshToken = null, userID = null) {
  if (accessToken) {
    window.$cookies.set(
      "accessToken",
      accessToken.token,
      accessToken.expiresIn
    );
  }

  if (refreshToken) {
    window.$cookies.set(
      "refreshToken",
      refreshToken.token,
      refreshToken.expiresIn
    );
  }

  if (userID) {
    window.$cookies.set("userID", userID.id, userID.expiresIn);
  }

  return;
}

export default setCookies;
