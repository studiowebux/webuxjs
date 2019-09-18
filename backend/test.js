
var abc="/test///healthcheck//test"
var clean = abc.replace(/(\/)\/+/g, "$1");

console.log(clean)