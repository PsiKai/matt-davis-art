const fs = require("fs")

const pathToEntry = "./build/index.html"
const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.[a-z0-9]+.\w{2,3}/g
const splitBy = "</title>"

const builtHTMLContent = fs.readFileSync(pathToEntry).toString()
const links = builtHTMLContent.match(bundlesRegExp)
const parts = builtHTMLContent.split(splitBy)

let headContent = [parts[0], splitBy]

console.log("Creating preload tags and injecting into HTML")
links.forEach(link => {
  let fileType = "script"

  ;/\.css$/.test(link) && (fileType = "style")

  headContent.push(`<link rel="preload" href=".${link}" as="${fileType}">`)
})

fs.readdirSync("./build/static/media/").forEach(file => {
  ;/\.ttf/.test(file) &&
    headContent.push(
      `<link rel="preload" href="./static/media/${
        file.split(".gz")[0]
      }" as="font" type="font/ttf" crossorigin>`
    )
})

headContent.push(parts[1])

fs.writeFileSync(pathToEntry, headContent.join(""))
