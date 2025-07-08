import {type Config} from "jest";

const config: Config = {
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eof|svg|png)$': '<rootDir>/test/fileMock.js',
        ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$":
            "<rootDir>/test/styleMock.js",
    },
}

export default config
