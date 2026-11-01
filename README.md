# Cognifyz Front-End Development Internship Project

This project demonstrates all eight tasks listed in the provided Cognifyz Front-End Development internship PDF.

## Included tasks

1. **Basic HTML page** — semantic HTML document, page title, headings, paragraphs and visual content.
2. **Inline CSS** — small inline-style demonstration is provided below in `task-demos/inline-css-demo.html`.
3. **Responsive design** — `styles.css` includes media queries for mobile, tablet and desktop.
4. **Interactive button** — JavaScript buttons change the page background and switch the color theme.
5. **API integration** — `script.js` uses `fetch()` to retrieve sample posts from JSONPlaceholder and render them in the page.
6. **Form styling and validation** — validates name, email, topic and message, with visible feedback.
7. **Component-based styling** — Bootstrap 5 is used for navigation, responsive grid, buttons and form controls.
8. **CSS preprocessing** — `styles.scss` includes variables and nested styles. A compiled `styles.css` is included, so the project runs without Sass.

## Run the project

1. Extract the ZIP folder.
2. Open the folder in VS Code.
3. Recommended: install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Make sure the browser has internet access for Bootstrap CDN and JSONPlaceholder API content.

You can also open `index.html` directly, but using Live Server is recommended.

## Compile Sass (optional)

Install Node.js first, then open a terminal in this project folder and run:

```bash
npm install
npm run sass
```

The command compiles `styles.scss` into `styles.css`. To keep watching for changes:

```bash
npm run sass:watch
```

## Folder structure

```text
Cognifyz_Frontend_Internship/
├── index.html
├── styles.css
├── styles.scss
├── script.js
├── package.json
├── README.md
└── task-demos/
    └── inline-css-demo.html
```

## Notes

- The contact form is a front-end validation demo only. It does not email or store submissions.
- API content requires an internet connection. If the API is unavailable, an error message is shown.
- Update the project with your own screenshots and a short demo video before sharing it on LinkedIn, as requested in the internship brief.
