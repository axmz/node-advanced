const dns = require("dns")

dns.lookup("google.com", (e, r) => {
  console.log(r)
})

dns.resolve4("google.com", (e, r) => {
  console.log(r)
})

dns.resolve("google.com", "A", (e, r) => {
  console.log(r)
})

dns.resolve("google.com", "MX", (e, r) => {
  console.log(r)
})

dns.reverse("172.217.18.174", (e, r) => {
  console.log(r)
})
