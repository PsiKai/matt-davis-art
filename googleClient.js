let googleAuth
if (process.env.NODE_ENV !== "production") {
  googleAuth = process.env.GOOGLE_APPLICATION_CREDENTIALS
} else {
  googleAuth = "google-credentials.json"
}
const { Storage } = require("@google-cloud/storage")
const storage = new Storage({ keyFileName: googleAuth })

module.exports = storage
