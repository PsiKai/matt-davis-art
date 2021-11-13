const fs = require("fs");

const pathToEntry = "./build/index.html";
const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.[a-z0-9]+.\w{2,3}/g;
const splitBy = "</title>";

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);
const parts = builtHTMLContent.split(splitBy);

let headContent = [parts[0], splitBy];

links.forEach(link => {
  let fileType = "script";

  if (/\.css$/.test(link)) {
    fileType = "style";
  }

  headContent.push(`<link rel="preload" href=".${link}" as="${fileType}">`)
});

// const fontFiles = /\.ttf$/
// fs.readdirSync('./build/static/media/').forEach(file => {
//     console.log(file);
//     if (fontFiles.test(file)) {
//         console.log("File match");
//         headContent.push(
//             `<link rel="preload" href="/static/media/${file}" as="font" type="font/ttf">`
//         )
//     }
// })
headContent.push('<link rel="preload" href="./client/static/media/NotoSans-Bold.66ab2974.ttf.gz" as="font" type="font/ttf" crossorigin')
headContent.push('<link rel="preload" href="./client/static/media/NotoSans-Regular.fa11626f.ttf.gz" as="font" type="font/ttf" crossorigin')
headContent.push('<link rel="preload" href="./client/static/media/Yellowtail-Regular.52d25579.ttf.gz" as="font" type="font/ttf" crossorigin')

headContent.push(parts[1]);

fs.writeFileSync(pathToEntry, headContent.join(""));