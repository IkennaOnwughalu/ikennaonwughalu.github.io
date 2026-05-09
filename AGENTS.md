## Cursor Cloud specific instructions

This is a static portfolio website (HTML/CSS/JS) with no build system, no package manager, and no dependencies.

### Running the site

Serve static files with any HTTP server, e.g.:

```bash
python3 -m http.server 8080 --directory /workspace
```

Then open `http://localhost:8080/` in a browser.

### Known issues

- `index.html` references `<script src="main.js">` but the actual JS file is named `script.js`. JavaScript features (custom cursor, scroll reveal, form simulation, etc.) will not load until this is fixed.

### Lint / Test / Build

- There are no lint tools, automated tests, or build steps configured for this project.
- There is no `package.json`, no CI/CD, and no testing framework.
