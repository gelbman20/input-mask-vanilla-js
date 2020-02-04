const gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  pug = require("gulp-pug");

const styles = ['./src/scss/*.scss'];
const path = {
  scss : {
    src : `${styles}`,
    watch: `./src/scss/**/*.scss`,
    dest : `./docs/css/`
  },
  pug: {
    src: `./src/pug/pages/*.pug`,
    watch: `./src/pug/**/*.pug`,
    dest: `./docs/`
  },
  html: {
    watch: `./docs/*.html`
  }
};

const config = {
  autoprefixer: false
};

function style() {
  return (
    gulp
      .src(path.scss.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('.'))
      .on("error", sass.logError)
      .pipe(gulp.dest(path.scss.dest))
      .pipe(browserSync.stream())
  );
}

function compilePug() {
  return (
    gulp.
      src(path.pug.src)
      .pipe(pug({
      
      }))
      .pipe(gulp.dest(path.pug.dest))
      .pipe(browserSync.stream())
  );
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  });
  gulp.watch(path.scss.watch, style);
  gulp.watch(path.pug.watch, compilePug);
  gulp.watch(path.html.watch, reload)
}

gulp.task('pug', gulp.series(compilePug));
gulp.task('scss', gulp.series(style));
gulp.task('watch', gulp.series(style, compilePug, watch));