const fs = require('fs').promises;
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 1) {
	console.error('Please specify a directory');
	process.exit(1);
}

const directory = args[0];
const depthArgIndex = args.findIndex((arg) => arg === '--depth' || arg === '-d');
const depth = depthArgIndex !== -1 ? parseInt(args[depthArgIndex + 1], 10) : Infinity;

async function tree(dir, depth, prefix = '') {
	if (depth < 0) return;

	const entries = await fs.readdir(dir, { withFileTypes: true });
	let output = '';

	for (const [index, entry] of entries.entries()) {
		const isLast = index === entries.length - 1;
		const nextPrefix = isLast ? '    ' : '│   ';
		const symbol = isLast ? '└── ' : '├── ';

		if (entry.isDirectory()) {
			output += `${prefix}${symbol}${entry.name}\n`;
			output += await tree(
				path.join(dir, entry.name),
				depth - 1,
				prefix + nextPrefix
			);
		} else {
			output += `${prefix}${symbol}${entry.name}\n`;
		}
	}

	return output;
}

(async () => {
	try {
		const result = await tree(directory, depth);
		console.log(result);
	} catch (err) {
		console.error('Error:', err.message);
	}
})();
