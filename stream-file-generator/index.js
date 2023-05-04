const fs = require('fs');


const randomNumber = () => {
	return Math.random().toString();
}

function write(filePath) {
	const writeableStream = fs.createWriteStream(filePath);

	for (let i = 0; i < 576000; i++) {
		writeableStream.write(randomNumber());
	}

	writeableStream.on('error', (error) => {
		console.log(`Error: ${error.message}`);
	});
	
	writeableStream.on('finish', () => {
		console.log("Finished streaming");

		
		var stats = fs.statSync("./deleteme");
		var fileSizeInBytes = stats.size;
		var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
		console.log("File size in b:", fileSizeInBytes);
		console.log("File size in Mb:", fileSizeInMegabytes);

	});

	writeableStream.end();
}

write("./deleteme");

