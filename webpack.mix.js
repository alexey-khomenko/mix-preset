let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');
require('laravel-mix-imagemin');

mix
    .setPublicPath('docs')
    .setResourceRoot('../')
    //.copyDirectory('resources/images/*.*', 'docs/images')
    .copyDirectory('resources/favicons/*.*', 'docs/favicons')
    .js('resources/scripts/app.js', 'js/scripts.js')
    .sass('resources/styles/app.scss', 'css/styles.css')
    .options({
        postCss: [
            require('tailwindcss')('tailwind.config.js'),
        ],
    })
    .pug('resources/views/pages/*.pug', 'docs', {
        excludePath: 'resources/views/pages',
        pug: {
            pretty: true,
        },
    })
;

if (mix.inProduction()) {
    mix
        .imagemin(
            'images/**.*',
            {
                context: 'resources',
            },
            {
                optipng: {
                    optimizationLevel: 5,
                },
                jpegtran: null,
                plugins: [
                    require('imagemin-mozjpeg')({
                        quality: 100,
                        progressive: true,
                    }),
                ],
            },
        );
    // todo сжать картинки
    // todo фавиконки на асгаре проверить
    // todo конфиги

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
}
else {
    mix.browserSync({
        server: './docs',
        files: [
            'resources/**/*.*',
        ],
    });
}