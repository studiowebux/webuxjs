function getCookies(name) {
  return new Promise(resolve => {
    try {
      const value = window.$cookies.get(name);
      if (!value) {
        resolve();
      }
      resolve(value);
    } catch (e) {
      return;
    }
  });
}

export default getCookies;
