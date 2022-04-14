var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var del = require('del');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


gulp.task('manageCSS', function () {
    del(['css/style.min.css', '!css']);
    var styles = ['src/css/normalize.css', 'src/scss/style.scss'];
    return gulp
        .src(styles)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write(undefined, {
            sourceRoot: null
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'));
});

gulp.task('manageJS', function () {
    del(['js/main.min.js', '!js']);
    var scripts = [`src/js/*.js`];

    var manageJS = gulp
        .src(scripts)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js'));

    return manageJS;
});

gulp.task('miniCSS', function () {
    return gulp
        .src('css/style.css')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', function () {
    gulp.watch('src/scss/*.scss', gulp.series(['manageCSS']));
    gulp.watch('src/scss/*/*.scss', gulp.series(['manageCSS']));
    gulp.watch('src/js/*.js', gulp.series(['manageJS']));
});