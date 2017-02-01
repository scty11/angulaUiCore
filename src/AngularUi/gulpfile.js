var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // create a browser sync instance.


gulp.task('watch', ['bs'], function () {

    gulp.watch([
        'wwwroot/app/**/*.html',
        'wwwroot/app/**/*.js',
        'wwwroot/css/*.css'
    ]).on('change', function (file) {
        console.log('File changed: ' + file.path);
        browserSync.reload();
    });
});


gulp.task('bs', function () {
    browserSync.init(
    {
        options: {
            proxy: "http://localhost:58422"
        }
    }
);

});