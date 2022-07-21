import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src', 'src/utils'],
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
