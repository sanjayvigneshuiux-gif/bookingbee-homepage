// Copies the single-file build to ./index.html so the site opens by double-clicking it.
import { readFileSync, writeFileSync, rmSync } from "node:fs"
let html = readFileSync(".build/app.html", "utf8")
// Vite fingerprints the favicon into .build/ — point it back at the file in public/assets.
html = html.replace(/href="\.\/avatar-bee-[\w-]+\.png"/g, 'href="public/assets/avatar-bee.png"')
writeFileSync("index.html", html)
rmSync(".build", { recursive: true, force: true })
console.log("✓ index.html updated — double-click it to open the site")
