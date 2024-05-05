module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/database/**',
    '!<rootDir>/src/mocks/**',
    '!<rootDir>/src/log/**',
    '!<rootDir>/src/**/*.schemas.ts',
    '!<rootDir>/src/**/*.repository.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  clearMocks: true,
};
