module.exports = {
  type: "json",
  blacklist: ["password"],
  format: {
    method: ":method",
    url: ":url",
    status: ":status",
    body: ":body",
    params: ":params",
    query: ":query",
    headers: ":headers",
    "http-version": ":http-version",
    "remote-ip": ":remote-addr",
    "remote-user": ":remote-user",
    length: ":res[content-length]",
    referrer: ":referrer",
    "user-agent": ":user-agent",
    "accept-language": ":language",
    "response-time": ":response-time ms"
  }
};
