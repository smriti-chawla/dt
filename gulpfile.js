var gulp = require("gulp");

//Sass convert to css
var sass = require("gulp-sass");

//Remove comments from css
var stripCssComments = require("gulp-strip-css-comments");

//Minify CSS
var cssmin = require("gulp-cssmin");

//Liver reload
var livereload = require("gulp-livereload");

//Components sass
gulp.task("sass", function() {
    return gulp.src(["app/components/header-component/header-component.scss",
        "app/components/sign-in/sign-in.scss",
        "app/components/sign-in-other/sign-in-other.scss"

        ])
        .pipe(sass())
        //.pipe(cssmin())
        .pipe(stripCssComments())
        .pipe(livereload())
        .pipe(gulp.dest("css/components"));
});


//Global sass file
gulp.task("sassMain", function() {
    return gulp.src(["assets/scss/main.scss"])
        .pipe(sass())
        //.pipe(cssmin())
        .pipe(stripCssComments())
        .pipe(livereload())
        .pipe(gulp.dest("css"))
});


//Task for combine the sprite images
var spritesmith = require("gulp.spritesmith");
gulp.task('sprite', function() {
    var spriteData = gulp.src('assets/images/icons/*.png')
        .pipe(spritesmith({
            imgName: '../assets/images/sprite.png',
            cssName: 'sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('images'));
    spriteData.css.pipe(gulp.dest('scss/mixins'));
});



//Watch sass  
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/**/**/**/*.scss', ['sass']);
    gulp.watch('assets/scss/**/*.scss', ['sassMain']);
});


//SCSS documentation 
var sassdoc = require('sassdoc');
gulp.task('sassdoc', function() {

    var options = {
        dest: './sassdoc/',
        groups: {
            'viewports': 'viewports',
            'undefined': 'Theme',
            foo: 'Foo group',
            bar: 'Bar group'
        }
    };

    return gulp.src(['scss/*.scss', 'scss/**/*.scss'])
        .pipe(sassdoc(options));
});
