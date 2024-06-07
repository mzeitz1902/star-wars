import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
  transform: {
    '^.+\\.(ts|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/node-modules/', '<rootDir>/dist/'],
};

export default config;
