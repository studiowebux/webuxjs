function getCookies(name) {
  return new Promise(resolve => {
    try {
      const value = window.$cookies.get(name);
      if (!value) {
        console.error("No value found for that cookie");
        resolve();
      }
      console.log("GET COOKIE");
      console.log(value);
      resolve(value);
    } catch (e) {
      return;
    }
  });
}

export default getCookies;
