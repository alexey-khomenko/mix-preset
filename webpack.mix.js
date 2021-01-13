const mix = require('laravel-mix');

// todo p ug
// todo alpine
// todo watch


mix
    .setPublicPath('docs')
    .setResourceRoot('/')
    .copyDirectory('resources/images/*.*', 'docs/images')
    .copyDirectory('resources/favicons/*.*', 'docs/favicons')
    .js('resources/js/app.js', 'js')
    .extract(['alpinejs'])
    .sass('resources/css/app.scss', 'css')
    .options({
        postCss: [
            require('tailwindcss')('tailwind.config.js'),
        ]
    })
;

if (mix.inProduction()) {
    // todo сжать картинки

    // const fs = require('fs');
    // const configs = [
    //     'resources/configs/favicons.json',
    //     'resources/configs/images.json',
    // ];
    //
    // configs.forEach(function (value) {
    //     JSON.parse(fs.readFileSync(value).toString()).forEach(function (value) {
    //         mix.version(value);
    //     });
    // });
} else {
    mix.browserSync({
        files: [
            'resources/**/*.*',
        ],
    });
}