module.exports = {
  verbose: true,
  snapshotSerializers: ['jest-serializer-vue'],
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/tests/**/*.(js)',
    '<rootDir>/tests/unit/**/*.spec.(js)',
    '<rootDir>/**/__tests__/**/*.(js)',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/App.vue',
    '!src/services/**/*.js',
    '!src/pages/**/*.{js,vue}',
    '!src/routes/**/*.js',
    '!src/layouts/**/*.{js,vue}',
  ],
  setupFiles: ['./tools/client.js', './tools/setupEnvFiles.js'],
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '^@data(.*)$': '<rootDir>/data$1',
    '^@build(.*)$': '<rootDir>/build$1',
    '^@common(.*)$': '<rootDir>/src/components/commons$1',
    '^@fragment(.*)$': '<rootDir>/src/components/fragments$1',
    '^@base(.*)$': '<rootDir>/src/components/fragments/@Base$1',
    '^@helper(.*)$': '<rootDir>/src/helpers$1',
    '^@lib(.*)$': '<rootDir>/src/libs$1',
    '^@plugin(.*)$': '<rootDir>/src/plugins$1',
    '^@util(.*)$': '<rootDir>/src/utils$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@route(.*)$': '<rootDir>/src/routes$1',
    '^@page(.*)$': '<rootDir>/src/pages$1',
    '^@layout(.*)$': '<rootDir>/src/layouts$1',
    '^@service(.*)$': '<rootDir>/src/services$1',
    '^@icon(.*)$': '<rootDir>/src/assets/icons$1',
    '^__mock__(.*)$': '<rootDir>__mocks__$1',
  },
};
