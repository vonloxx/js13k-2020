import { terser } from "rollup-plugin-terser";
import html from 'rollup-plugin-html2';
import image from 'rollup-plugin-img';
import { string } from "rollup-plugin-string";
import stripCode from "rollup-plugin-strip-code";
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import kontra from 'rollup-plugin-kontra'
import rollupPluginES6ClassMinify from 'rollup-plugin-es6-class-minify';

const options = {
  toplevel: true,
  mangle: {
    properties: false,
    keep_fnames: false,
  },
  compress: {
    passes: 5,
    unsafe: true,
    pure_getters: true,
  },
  ecma: 6, // specify one of: 5, 6, 7 or 8
  // keep_classnames: false,
  keep_fnames: false,
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
  kontra({
    gameObject: {
      rotation: true,
    }
  }),
  rollupPluginES6ClassMinify(),
  // kontra({
  //   gameObject: {
  //     acceleration: false,
  //     camera: false,
  //     opacity: false,
  //   }
  // }),
];

module.exports = [
  {
    input: 'src/main.js',
    output: {
      file: 'docs/bundle.js',
      format: 'cjs',
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
