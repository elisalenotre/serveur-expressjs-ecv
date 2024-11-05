module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.test.(ts|js)', '**/*.test.(ts|js)'],
    moduleDirectories: ['node_modules', 'src'],
  };
  