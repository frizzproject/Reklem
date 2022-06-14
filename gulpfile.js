"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const groupMedia = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
const gulpSass = require("gulp-sass");
const dartSass = require("sass");
const sass = gulpSass(dartSass);
const cssnano = require("gulp-cssnano");
const rigger = require("gulp-rigger");
const uglifyEs = require("gulp-uglify-es").default;
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const del = require("del");
const panini = require("panini");
const fileInclude = require("gulp-file-include");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browsersync = require("browser-sync").create();

/* Paths */
var path = {
    build: {
        html: "dist/",
        js: "dist/assets/js/",
        css: "dist/assets/css/",
        images: "dist/assets/img/",
        fonts: "dist/assets/fonts/"
    },
    src: {
        html: "src/*.html",
        js: "src/assets/js/*.js",
        css: "src/assets/sass/style.scss",
        images: "src/assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml}",
        fonts: "src/assets/fonts/**/*.*"
    },
    watch: {
        html: "src/**/*.html",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.scss",
        images: "src/assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml}",
        fonts: "src/assets/fonts/**/*.*"
    },
    clean: "./dist"
}



/* Tasks */
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist/"
        },
        port: 3000,
        notify: false
    });
}

function browserSyncReload(done) {
    browsersync.reload();
}

function html() {
    panini.refresh();
    return src(path.src.html, { base: "src/" })
        .pipe(plumber())
        .pipe(panini({
            root: 'src/',
            layouts: 'src/tpl/layouts/',
            partials: 'src/tpl/partials/',
            helpers: 'src/tpl/helpers/',
            data: 'src/tpl/data/'
        }))
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: "src/assets/sass/" })
        .pipe(plumber())
        .pipe(sass())
        .pipe(groupMedia())
        .pipe(autoprefixer({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(rename({
            basename: "main",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            basename: "main",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {base: './src/assets/js/'})
        .pipe(plumber())
        .pipe(webpackStream({
          mode: "production",
          output: {
            filename: 'main.min.js',
          },
          module: {
            rules: [
              {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                  presets: ['@babel/preset-env']
                }
              }
            ]
          }
        }))
        .pipe(uglifyEs())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        // .pipe(imagemin(
        //     {
        //         nterlaced: true,
        //         progressive: true,
        //         optimizationLevel: 3, // 0 to 7
        //         svgoPlugins: [{ removeViewBox: false }],
        //     }
        // ))
        .pipe(dest(path.build.images));
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync);



/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
