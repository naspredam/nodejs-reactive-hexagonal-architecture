module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@core/(.*)$": "<rootDir>/src/$1",
        "^@test-data/(.*)$": "<rootDir>/test/data/$1"
    }
};