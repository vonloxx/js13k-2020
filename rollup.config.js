import { terser } from "rollup-plugin-terser";
import html from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import image from 'rollup-plugin-img';
import { string } from "rollup-plugin-string";
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import kontra from 'rollup-plugin-kontra'

const options = {
  mangle: {
    properties: false,
    toplevel: true,
  },
  compress: {
    passes: 2,
  },
  nameCache: {},
};

export default [{
  input: "./src/main.js",
  output: {
    file: 'dist/game.js',
    format: 'cjs',
    sourcemap: 'inline',
    globals: [
      'kontra',
    ],
  },
  plugins: [
    html({
      template: './src/index.html',
      dest: "dist",
      filename: 'index.html',
      inject: 'body',
    }),
    image({
      limit: 10000
    }),
    serve({
      open: true,
      contentBase: 'dist',
    }),
    livereload({
      watch: 'dist',
    }),
    nodeResolve(),
    terser(options),
    copy({
      targets: [
        { src: 'src/lib/zzfx.js', dest: 'dist' },
        { src: 'src/lib/zzfxm.min.js', dest: 'dist' },
      ]
    }),
    kontra({
      debug: true,
    }),

    // string({
    //   include: ['**/*.frag', '**/*.vert'],
    // }),
  
    // sourcemaps(),
    // nodeResolve(),
    // terser()
  ],
}];