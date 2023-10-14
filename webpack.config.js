// This comes from https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js
const { resolve } = require('path');

const wpConfig = require('@wordpress/scripts/config/webpack.config');


// Modified config
module.exports = {
    ...wpConfig,
    output: {
        filename: '[name].js',
        path: resolve(process.cwd(), 'dist'),
    }
};
