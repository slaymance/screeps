import babel from '@rollup/plugin-babel';
import screeps from 'rollup-plugin-screeps';
import { config } from 'dotenv';

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
    babel({ babelHelpers: 'bundled' }),
    screeps({ config: branchConfig, dryRun: null })
  ],
};
