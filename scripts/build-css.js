import { readdirSync, writeFileSync } from "fs";
import sass from "sass";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import { parse } from "path";

(async () => {
  const scss = readdirSync("css")
    // TODO: remove popover styles once it adopts v11 styles
    .filter((file) => file.endsWith(".scss") && !/^\_popover/.test(file))
    .map((file) => parse(file));

  for (const { name, base } of scss) {
    const file = `css/${base}`;
    const outFile = `css/${name}.css`;

    console.log("[build-css]", file, "-->", outFile);

    const { css } = sass.compile(file, {
      style: "compressed",
      sourceMap: true,
      loadPaths: ["node_modules"],
    });

    writeFileSync(outFile, css);
  }
})();
