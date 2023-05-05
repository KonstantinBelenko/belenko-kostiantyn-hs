const fs = require('fs');
const { textIndexing } = require('./index');
const { expect } = require('@jest/globals');

const testFilePath = (filename) => `./test_files/${filename}`;

beforeAll(() => {
	if (!fs.existsSync(testFilePath(''))) {
		fs.mkdirSync(testFilePath(''));
	}
});

afterAll(() => {
	fs.rm(testFilePath(''), { recursive: true }, () => {});
});


test('text indexing examples', async () => {
	const examples = [
		{ input: 'a c b b', expected: '1,2,1' },
		{ input: 'ab cb bss b', expected: '1,1,1,1' },
		{ input: 'ab, cb, bss, cb, b, cb', expected: '1,1,1,3' },
		{ input: 'alex, alex, juan, dima', expected: '2,1,1' },
		{ input: 'hello world, world! Hello', expected: '2,2' },
	];

	for (let i = 0; i < examples.length; i++) {
		const example = examples[i];
		const inputFile = testFilePath(`input_${i}.txt`);
		const outputFile = testFilePath(`output_${i}.txt`);

		fs.writeFileSync(inputFile, example.input);

		await new Promise((resolve) => {
			textIndexing(inputFile, outputFile).then(() => {
				const result = fs.readFileSync(outputFile, 'utf8');
				expect(result).toBe(example.expected);
				fs.unlinkSync(inputFile);
				fs.unlinkSync(outputFile);
				resolve();
			});
		});
	}
}, 10000);
