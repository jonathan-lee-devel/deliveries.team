/** @type {import('tailwindcss').Config} */
import {join} from 'path';
import type {Config} from 'tailwindcss';
import {skeleton} from '@skeletonlabs/tw-plugin';

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    join(require.resolve(
        '@skeletonlabs/skeleton'),
    '../**/*.{html,js,svelte,ts}'
    ),
  ],
  theme: {extend: {}},
  plugins: [require('flowbite/plugin'), require('daisyui'), skeleton({
    themes: {preset: ['skeleton']},
  })],
} satisfies Config;

export default config;

