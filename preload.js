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
//   fileWithPreload = [
//     ...fileWithPreload,
//     `<link rel="preload" href=".${link}" as="${fileType}">`
//   ];
headContent.push(`<link rel="preload" href=".${link}" as="${fileType}">`)
});

// fileWithPreload = [...fileWithPreload, parts[1]];
headContent.push(parts[1]);

fs.writeFileSync(pathToEntry, headContent.join(""));