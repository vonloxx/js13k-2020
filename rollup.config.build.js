import { terser } from "rollup-plugin-terser";
import html from 'rollup-plugin-html2';
import image from 'rollup-plugin-img';
import { string } from "rollup-plugin-string";
import stripCode from "rollup-plugin-strip-code";
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';

const options = {
  mangle: {
    properties: false,
    toplevel: true,
  },
  compress: {
    passes: 5,
    unsafe: true,
    pure_getters: true,
  },
  ecma: 6, // specify one of: 5, 6, 7 or 8
  // keep_classnames: false,
  // keep_fnames: false,
  // ie8: false,
  // module: false,
  // nameCache: null, // or specify a name cache object
  // safari10: false,
  // // toplevel: false,
  // warnings: false,
};

const plugins = [
  nodeResolve(),
  terser(options),
  html({
    template: 'src/index.html',
    dest: "docs",
    inject: 'body',
  }),
  image({
    limit: 10000
  }),
  string({
    include: ['**/*.frag', '**/*.vert'],
  }),
  stripCode({
    start_comment: 'start-test-code',
    end_comment: 'end-test-code'
  }),
];

module.exports = [
  {
    input: 'src/main.js',
    output: {
      file: 'docs/bundle.js',
      format: 'iife',
      // sourcemap: 'inline',
    },
    treeshake: true,
    plugins: [
      ...plugins,
      // copy({
      //   targets: [
      //     { src: 'src/favicon.ico', dest: 'docs' },
      //   ]
      // })
  
    ],
  },
];
