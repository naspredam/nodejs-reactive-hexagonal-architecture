module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@adapter/(.*)$": "<rootDir>/src/adapter/$1",
        "^@application/(.*)$": "<rootDir>/src/application/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
        "^@test-data/(.*)$": "<rootDir>/test/data/$1"
    }
};