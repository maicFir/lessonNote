import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
export default [
    {
        input: "./index.js",
        output: {
            format: 'cjs',
            file: 'bundle_cjs.js',
            chunkFileNames: '[name]-[hash].js'
            // dir: './js/bundle_cjs'
        },
        plugins: [commonjs(), babel({
            exclude: ['node_modules/**']
        })]
    },
    {
        input: 'index.js',
        output: {
            format: 'es',
            file: 'bundle_es.js'
        },
        plugins: [commonjs(), babel({
            exclude: ['node_modules/**']
        })]
    },
    {
        input: 'index.js',
        output: {
            format: 'umd',
            file: 'bundle_umd.js'
        },
        plugins: [commonjs(), babel({
            exclude: ['node_modules/**']
        })]
    }
]