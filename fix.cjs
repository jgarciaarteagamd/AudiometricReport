const fs = require("fs");
const path = require("path");
const dir = "src/i18n";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".ts"));
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf8");
  
  content = content.replace(/\(AMA\/AAO\/OMS\)/g, "(AAO-HNS/AMA/AAOO)");
  content = content.replace(/\(AMA\/AAO\/WHO\)/g, "(AAO-HNS/AMA/AAOO)");
  
  content = content.replace(/AMA\/AAO\/OMS/g, "AAO-HNS/AMA/AAOO");
  content = content.replace(/AMA\/AAO\/WHO/g, "AAO-HNS/AMA/AAOO");
  
  content = content.replace(/AMA 1979, AAO y OMS/g, "AAO-HNS, AMA y AAOO");
  content = content.replace(/AMA 1979, AAO e OMS/g, "AAO-HNS, AMA e AAOO");
  content = content.replace(/AMA 1979, AAO et OMS/g, "AAO-HNS, AMA et AAOO");
  content = content.replace(/AMA 1979, AAO, and WHO/g, "AAO-HNS, AMA, and AAOO");
  content = content.replace(/AMA 1979, AAO und WHO/g, "AAO-HNS, AMA und AAOO");

  fs.writeFileSync(filePath, content, "utf8");
});
console.log("Replacements complete.");
