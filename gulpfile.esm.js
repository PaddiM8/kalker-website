'use strict';

import { task, src, dest, watch, series } from 'gulp';
import sass, { compiler, logError } from 'gulp-sass';
import inlineSource from 'gulp-inline-source-html'

compiler = require('sass');

task('sass', async () => {
    return src('./style/**/*.sass')
        .pipe(sass().on('error', logError))
        .pipe(dest('./public/dist'));
});

task('inlineSource', async () => {
    return src('*.html')
        .pipe(inlineSource({ compress: true }))
        .pipe(dest('public'));
});

task('copyKalkComponent', async () => {
    return src('./node_modules/@paddim8/kalk-component/public/build/*')
        .pipe(dest('./public/dist/'));
});

task('watch', () => {
    watch('./style/**/*.sass', ['sass']);

});

task('default', series('sass', 'inlineSource', 'copyKalkComponent'));
