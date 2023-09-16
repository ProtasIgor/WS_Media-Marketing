'use strict';

const { src, dest, watch, series, parallel } = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

const svgsprite = require('gulp-svg-sprite');
const newer = require('gulp-newer');

const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

const rename = require("gulp-rename");
var gulpCopy = require('gulp-copy');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();


function Pug() {
    return src('app/components/index.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(rename('index.html'))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function Sass() {
    return src('app/scss/main.scss')
        .pipe(autoprefixer({
            grid: "no-autoplace",
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 11',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6',
            ],
        }
        ))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function Script() {
    return src(['app/js/src/validation.js', 'app/js/src/form.js', 'app/js/src/index.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function Images() {
    return src(['app/images/src/*', '!app/images/src/*.svg'])
        .pipe(newer('app/images'))
        .pipe(avif({ quality: 50 }))

        .pipe(src('app/images/src/*'))
        .pipe(newer('app/images'))
        .pipe(webp())

        .pipe(src('app/images/src/*'))
        .pipe(newer('app/images'))
        /* .pipe(imagemin()) */
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 50, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))

        .pipe(dest('app/images'))
        .pipe(browserSync.stream())
}

function Sprite() {
    return src(['app/images/*.svg', '!app/images/sprite.svg'])
        .pipe(svgsprite({
            mode: {
                stack: {
                    dest: 'info-svg',
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images'))
}

function Font() {
    return src('app/fonts/src/*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

function Server() {
    browserSync.init({
        server: {
            baseDir: "dist",
        }
    });
}

function Watch() {
    watch(['app/components/*'], Pug)
    watch(['app/scss/components/*', 'app/scss/*'], Sass)
    watch(['app/js/src/*'], Script)
    watch('app/images/src/*', Images)
    watch(['app/index.html']).on('change', browserSync.reload)
}

function Build() {
    return src([
        'app/css/style.min.css',
        'app/js/script.min.js',
        'app/images/*',
        '!app/images/info-svg',
        '!app/images/*.svg',
        'app/images/sprite.svg',
        'app/fonts/*',
        'app/favicons/*',
        'app/*.html'
    ], { base: 'app', allowEmpty: true })
        .pipe(dest('dist'))
}

function Clean() {
    return src('dist/')
        .pipe(clean())
        .pipe(dest('dist'));
}

exports.pug = Pug;
exports.sass = Sass;
exports.js = Script;
exports.svg = Sprite;
exports.font = Font;
exports.image = Images;
exports.server = Server;
exports.build = series([Clean, Build]);
exports.clean = Clean;

exports.default = parallel([Server, Watch]);