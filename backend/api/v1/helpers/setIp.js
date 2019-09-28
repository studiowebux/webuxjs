/**
 * Return the IP of the client
 * @private
 * @param {Object} req Express req object
 */
function setIp(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  );
}

module.exports = setIp;
