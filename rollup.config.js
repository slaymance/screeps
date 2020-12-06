import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import screeps from 'rollup-plugin-screeps';
import { config } from 'dotenv';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

config({ path: `.env.${process.env.DEST}` });

const branchConfig = {
  token: process.env.TOKEN,
  protocol: 'https',
  hostname: 'screeps.com',
  port: 443,
  path: '/',
  branch: 'default'
};

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, 'babel.config.json')
    }),
    commonjs(),
    resolve(),
    process.env.TOKEN && screeps({ config: branchConfig, dryRun: null })
  ],
};
