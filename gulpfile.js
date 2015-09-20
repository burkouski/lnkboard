var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    spritesmith  = require('gulp.spritesmith'),
    minifyCSS = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    useref = require('gulp-useref');
    //jsArr = [
    //    './static/js/vendor/jquery-1.11.1.min.js',
    //    './static/js/vendor/jquery-migrate-1.2.1.min.js',
    //    './static/js/vendor/bootstrap.min.js',
    //    './static/js/vendor/bootstrap-hover-dropdown.min.js',
    //    './static/js/vendor/jquery.magnific-popup.min.js',
    //    './static/js/vendor/masonry.js',
    //    './static/js/vendor/imagesLoaded.js',
    //    './static/js/vendor/custom.js',
    //    './static/js/app/vendor/angular.js',
    //    './static/js/app/vendor/angular-pagination.js',
    //    './static/js/app/vendor/angular-resource.js',
    //    './static/js/app/vendor/angular-route.js',
    //    './static/js/app/vendor/angular-ymaps.js',
    //    './static/js/app/services/getJsonService.js',
    //    './static/js/app/controllers/mainmapCtrl.js',
    //    './static/js/app/controllers/autoserviceCtrl.js',
    //    './static/js/app/app.js',
    //    './static/js/plugins.js',
    //    './static/js/main.js'
    //]
    //cssArr = [
    //    './static/css/bootstrap-template/bootstrap.css',
    //    './static/font-awesome/css/font-awesome.min.css',
    //    './static/css/bootstrap-template/style.css',
    //    './static/css/bootstrap-template/responsive.css',
    //    './static/css/global.css',
    //    './static/css/blocks.css'
    //]

// Задачи выполняемые при старте.
gulp.task('default', function () {
    gulp.start([
        'stylus',
        'sprite',
        'watch',

    ]);
});



// Включаем наблюдателей в рабочей директории
gulp.task('watch', function () {
    watch(['./stylus/**/*.styl'], function (vinly) {
        gulp.start('stylus');
        console.error('done')
    });
    watch(['./static/img/sprite/*.*'], function (vinly) {
        gulp.start('sprite');
        console.error('done-sprite')
    });
});

    // компиляция stylus
gulp.task('stylus', function () {
    gulp.src(['./stylus/*.styl', '!./stylus/mixins/*.styl'])
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./static/css'))
});

    // Создание спрайта
    gulp.task('sprite', function() {
            var spriteData = gulp.src('./static/img/sprite/*.*') // путь, откуда берем картинки для спрайта
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.styl',
                    cssFormat: 'stylus',
                    algorithm: 'binary-tree',
                    cssTemplate: './static/stylus/stylus.template.mustache',
                    cssVarMap: function(sprite) {
                        sprite.name = 's-' + sprite.name
                    }
                }));

        spriteData.img.pipe(gulp.dest('./static/img/bg')); // путь, куда сохраняем спрайт
        spriteData.css.pipe(gulp.dest('./static/stylus/mixins/')); // путь, куда сохраняем стили
    });

// Задача по сборке проекта в папку ./app.
gulp.task('build', function () {
    gulp.start([
        'img-min',
        'build-css',
        'build-js',
    ]);
});


// сборка js
gulp.task('build-js', function() {
    gulp.src(newJsArr)
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

// сборка css
gulp.task('build-css', function() {
    gulp.src(newCssArr)
        .pipe(concat('build.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./static/css'));
});

// оптимизация изображений
gulp.task('img-min', function () {
    gulp.src('./media/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/media/img'))
});


gulp.task('test', function () {
    //gulp.start('copy-source');
    var assets = useref.assets({searchPath: ''});
    //console.log(assets);
    return gulp.src('layout-min.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify({
            mangle: false
        })))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});




