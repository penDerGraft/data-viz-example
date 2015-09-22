/*jshint node: true*/

var gulp = require("gulp"),
    serv = require("gulp-connect");

gulp.task("connect", function() {
    serv.server({
        root: "app",
        livereload: true
    });
});

gulp.task("reload", function() {
    gulp.src("./app/**/*")
        .pipe(serv.reload());
});

gulp.task("watch", function() {
    gulp.watch(["./app/**/*"], ["reload"]);
});

gulp.task("default", ["connect", "watch"]);
