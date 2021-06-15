/* eslint-disable */
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "js",
    "jsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/enzyme.config.js"],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    "enzymeAdapter": "react16"
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
