# ALIMC-CPCM
Albanian Central Portal for Control and Management

## Installation
- Pull the project from github `git clone git@github.com:NEOSHR/cpcm`
- cd into initium directory
- `npm install` will install all gulp modules, vendor frameworks and script dependencies
- `gulp install` will compile .scss into build/ and dist/ folders, and copy main app.js, frameworks and vendors scripts into build/ folder
- Run `gulp` to start browserSync server at localhost:3000, it will watch for changes of any .scss and .html files inside src/ folder
- Every change of .html and .scss files in src/ folder will compile into build/ directory
- Run only once `gulp styles-min` to compile minified `initium.min.css` for production
- Run only once `gulp dist` to compile `initium.css` and minified `initium.min.css` inside dist/ folder
- Run only once `gulp production` to minify CSS, concat and minify JS files, and optimize images/SVG files

