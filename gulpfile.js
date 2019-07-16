// Gulp & plugins
var gulp = require("gulp"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-ruby-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  tinify = require("gulp-tinify"),
  svgmin = require("gulp-svgmin"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  fileinclude = require("gulp-file-include");
// Sources
var src = {
  components: "src/assets/components/**/*.html",
  favicon: "src/assets/images/favicon.ico",
  images: "src/assets/images/**/*.{gif,jpg,png,ico}",
  styles: "src/assets/styles/",
  fonts: "src/assets/fonts/**/*.{eot,svg,ttf,woff}",
  html: "src/*.tpl.html",
  scss: "src/assets/styles/**/*.scss",
  svg: "src/assets/images/**/*.svg",
  js: "src/assets/js/**/*.js",
  // Vendors
  modernizr: "node_modules/npm-modernizr/modernizr.js",
  jquery: "node_modules/jquery/dist/jquery.min.js"
};

// Builds
var build = {
  scripts: ["build/assets/js/**/*.js"],
  favicon: "build/",
  images: "build/assets/images/",
  fonts: "build/assets/fonts/",
  dest: "build/",
  html: "build/**/*.html",
  css: "build/",
  js: "build/assets/js",
  // Vendors
  vendors: "build/assets/js/vendors/"
};

// Distribution
var dist = {
  mincss: "dist/",
  css: "dist/"
};

// --- [ TASKS ]
// Static server & watcher
gulp.task("server", ["styles"], function() {
  browserSync.init({
    server: build.dest,
    open: false
    // tunnel: "neosinternal"
  });

  // Watch for SCSS
  gulp.watch(src.scss, ["styles"]);
  // Watch for HTML Template files
  gulp.watch(src.html, ["fileinclude"]);
  // Watch for HTML components
  gulp.watch(src.components, ["fileinclude"]);
  gulp.watch(build.html).on("change", browserSync.reload);
  // Watch for JS
  gulp.watch(src.js, ["app-js"]);
  gulp.watch(build.scripts, browserSync.reload);
});

// --- [ STYLES ]
// Scss, Error handling, Autoprefixer and sourcemaps
gulp.task("styles", function() {
  return sass(src.scss, {
    style: "expanded",
    sourcemap: true
  })
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(
      sourcemaps.write("/", {
        includeContent: false,
        sourceRoot: "/"
      })
    )
    .pipe(gulp.dest(build.css))
    .pipe(
      browserSync.stream({
        match: "**/*.css"
      })
    );
});

// Scss min, Error handling, Autoprefixer
gulp.task("styles-min", function() {
  return sass(src.scss, {
    style: "compressed"
  })
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(build.css))
    .pipe(
      browserSync.stream({
        match: "**/*.css"
      })
    );
});

// STYLES to dist/
gulp.task("styles-dist", function() {
  return sass(src.scss, {
    style: "expanded",
    sourcemap: true
  })
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(
      sourcemaps.write("/", {
        includeContent: false,
        sourceRoot: "/"
      })
    )
    .pipe(gulp.dest(dist.css));
});

// STYLES-MIN to dist/
gulp.task("styles-min-dist", function() {
  return sass(src.scss, {
    style: "compressed"
  })
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(dist.mincss));
});

// --- [ FILEINCLUDE ]
// Fileinclude and rename files
gulp.task("fileinclude", function() {
  return gulp
    .src([src.html])
    .pipe(
      fileinclude({
        indent: true
      })
    )
    .pipe(
      rename({
        extname: ""
      })
    )
    .pipe(
      rename({
        extname: ".html"
      })
    )
    .pipe(gulp.dest(build.dest));
});

// --- [ IMAGES & SVG ]
// Copy images
gulp.task("images", function() {
  // Copy images and svgs
  return gulp.src([src.images, src.svg]).pipe(gulp.dest(build.images));
});

// Copy favicon
gulp.task("favicon", function() {
  // Copy favicon.ico to build/ folder
  return gulp.src(src.favicon).pipe(gulp.dest(build.favicon));
});

// Optimize images
gulp.task("image-min", function() {
  gulp
    .src(src.images)
    .pipe(tinify("hcYKDxhpqdqHfZKwnZ9lzM85RvyOzIee"))
    .pipe(gulp.dest(build.images));
});

// SVGO
gulp.task("svg-min", function() {
  return gulp
    .src(src.svg)
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false,
            cleanupIDs: false,
            cleanupAttrs: false
          }
        ]
      })
    )
    .pipe(gulp.dest(build.images));
});

// Copy fonts
gulp.task("fonts", function() {
  // Copy fonts
  return gulp.src(src.fonts).pipe(gulp.dest(build.fonts));
});

// --- [ SCRIPTS FOR PRODUCTION ]
// Main app.js file
gulp.task("app-js", function() {
  // Copy main app.js
  return gulp.src([src.js]).pipe(gulp.dest(build.js));
});
// Concat all .js files into new _app.js
gulp.task("js-concat", function() {
  return gulp
    .src(build.scripts)
    .pipe(concat("_app.js"))
    .pipe(gulp.dest(build.js));
});
// Minify .js
gulp.task("js-min", function() {
  return gulp
    .src("build/assets/js/_app.js")
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(build.js));
});

// --- [ COPY FRAMEWORKS & SCRIPTS ]
// Javascript vendors
gulp.task("js-vendors", function() {
  // Copy all vendors
  return gulp.src([src.modernizr, src.jquery]).pipe(gulp.dest(build.vendors));
});

// --- [ INSTALL PROJECT ]
// gulp install - Copies CSS and CSS.min, copies main app.js file, jQuery, Modernizr, images and SVGs, favicon.ico and fonts
gulp.task("install", [
  "styles",
  "styles-dist",
  "styles-min-dist",
  "fileinclude",
  "app-js",
  "js-vendors",
  "images",
  "favicon",
  "fonts"
]);

// --- [ PRODUCTION ]
// gulp production - compresses .css, combines all .js into _app.js and minifies, optimizes all images and svgs
gulp.task("production", [
  "styles-min",
  "js-concat",
  "js-min",
  "image-min",
  "svg-min"
]);

// --- [ DiSTRiBUTiON ]
// gulp dist - Compile scss to CSS and CSS.min and put them in the dist/ folder
gulp.task("dist", ["styles-dist", "styles-min-dist"]);

// --- [ DEFAULT TASK ]
// gulp
gulp.task("default", ["styles", "server", "app-js"]);
