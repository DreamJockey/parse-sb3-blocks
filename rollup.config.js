import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

const isDev = process.env.mode === 'dev';
if (isDev) {
    console.log('Building dev version...');
} else {
    console.log('Buiding production...');
}

const mainFile = './src/index.js';

export default [
    {
        input: mainFile,
        output: [
            {
                name: 'parseSB3Blocks',
                file: pkg.browser,
                format: 'umd'
            },
            {
                file: pkg.module,
                format: 'esm',
                sourcemap: !isDev
            },
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: !isDev
            }
        ],
        plugins: [
            babel(),
            !isDev && terser()
        ]
    }
];
