import * as mergeSass from "merge-sass";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const config = Object.freeze({
  source: {
    folder: "./src",
    alpha: "alpha.scss",
    bravo: "bravo.scss"
  },
  dist: {
    folder: "./dist",
    file: "assets.scss"
  }
});

/**
 * Merges alpha & bravo into dist/assets.scss.
 */
export async function bundle() {
  const alpha = join(config.source.folder, config.source.alpha);
  const bravo = join(config.source.folder, config.source.bravo);

  const result = mergeSass(
    readFileSync(alpha),
    readFileSync(bravo)
  );
  writeFileSync(join(config.dist.folder, config.dist.file), result);
}

bundle();
