const fs = require('fs');
const readline = require('readline');
const { Transform } = require('stream');

function textIndexing(inputFile, outputFile) {
	return new Promise((resolve) => {
		const readStream = fs.createReadStream(inputFile);
		const writeStream = fs.createWriteStream(outputFile);

		const wordCount = new Map();

		const processLine = (line) => {
			line = line.replace(/[^\w\s]|_/g, '').toLowerCase();
			const words = line.split(/\s+/);

			for (const word of words) {
				if (word) {
					wordCount.set(word, (wordCount.get(word) || 0) + 1);
				}
			}
		};

		const rl = readline.createInterface({
			input: readStream,
			output: new Transform(),
			crlfDelay: Infinity,
		});

		rl.on('line', processLine);

		rl.on('close', () => {
			const sortedWords = Array.from(wordCount.keys()).sort();
			const resultVector = sortedWords.map((word) => wordCount.get(word));
			writeStream.write(resultVector.join(','));
			writeStream.end();
			resolve();
		});
	});
}

module.exports = {
	textIndexing,
};

