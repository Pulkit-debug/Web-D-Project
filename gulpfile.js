// Info
/**
 *  Gulp sass converts the saas files to css files.
 *  gulp css nano converts that css to one line saving space
 * 
 */

const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default; // used to minify the javascript
const imagemin = require("gulp-imagemin"); // for compressing images
const del = require("del");

gulp.task("css", function (done) {
    console.log("minifying css...");
    gulp.src("./assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest("./assets.css"))
    // pipe is a function which is calling all these middlewares sass, cssnano etc.

    gulp.src("./assets/**/*.css") // any folder or subfolder which contains a css file.
        .pipe(rev())
        .pipe(gulp.dest("./public/assets"))
        .pipe(rev.manifest({
            cwd: "public",
            merge: true
        }))
        .pipe(gulp.dest("./public/assets"));
    done();
});


gulp.task("js", function (done) {
    console.log("Minifying js...");
    gulp.src("./assets/**/*.js")
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets"))
        .pipe(rev.manifest({
            cwd: "public",
            merge: true,
        }))
        .pipe(gulp.dest("./public/assets"));
    done();
});

gulp.task("images", function (done) {
    console.log("Compressing Images.. ");
    gulp.src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")   // this is a regest expression
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets"))
        .pipe(rev.manifest({
            cwd: "public",
            merge: true
        }))
        .pipe(gulp.dest("./public/assets"));
    done();
});


// Empty the public/assets library

gulp.task("clean:assets", function (done) {
    del.sync("./public/assets");
    done();
});


gulp.task("build", gulp.series("clean:assets", "css", "js", "images"), function (done) {
    console.log("Building Assets.... ");
    done();
});