/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

function makeModuleNameMapper(tsconfigPath) {
	// Get paths from tsconfig
	const { paths } = require(tsconfigPath).compilerOptions;

	const aliases = {};

	// Iterate over paths and convert them into moduleNameMapper format
	Object.keys(paths).forEach((item) => {
		const key = item.replace('/*', '/(.*)');
		const path = paths[item][1].replace('/*', '/$1');
		aliases[key] = `<rootDir>/${path}`;
	});
	return aliases;
}

const TS_CONFIG_PATH = './tsconfig.json';

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: makeModuleNameMapper(TS_CONFIG_PATH),
};
