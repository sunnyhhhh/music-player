let gulp = require('gulp');


// 压缩html
// gulp中插件应用 下载插件 --》取到插件 --》 应用插件

let htmlClean = require('gulp-htmlclean');

// 压缩图片
let imageMin = require('gulp-imagemin');

// 压缩Js文件
let uglify = require('gulp-uglify');

// 去掉js中的调试语句
let debug = require('gulp-strip-debug');

// 将less转换成css
let less = require('gulp-less');

// 压缩css
let cleanCss = require('gulp-clean-css');

// 给css添加前缀
// postcss    autoprefixer
let postCss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');

// 开启服务器代理
let connect = require('gulp-connect');


let folder = {
    src: 'src/',
    dist: 'dist/'
}

// 判断当前环境变量
let devMod = process.env.NODE_ENV == 'development'

// export NODE_ENV=development   在git bash中设置环境变量

gulp.task('html', function () {
    let page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('mock', function(){
    gulp.src(folder.src + 'mock/*')
        .pipe(gulp.dest(folder.dist + 'mock/'))
})

// 压缩图片
gulp.task('image', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task('css', function () {
    let page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task('js', function () {
    let page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('server', function () {
    connect.server({
        port: '8888',
        livereload: true
    });
})

// 监听文件变化
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'mock/*', ['mock']);
})

gulp.task('default', ['html', 'css', 'js', 'image', 'server', 'watch', 'mock']);

// less ---> 自动添加css3前缀 ---> 压缩 ---> css文件

// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()

// 高效 一次输入 多次改变流 一次输出

// gulp -- runner task
// webpack -- module binder