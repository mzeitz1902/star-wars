import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            tsConfig: 'cypress/tsconfig.json',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            assets: ['src/assets'],
            styles: ['src/styles.scss'],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true,
          },
        },
      },
    },
    specPattern: '**/*.cy.ts',
    supportFile: 'cypress/support/component.ts',
  },
});
