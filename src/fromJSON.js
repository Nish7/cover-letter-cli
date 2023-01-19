import response from '../input.json' assert { type: 'json' };
import genDate from './lib/genDate.js';
import genPDF from './lib/genPDF.js';

async function main() {
	// cleaning data

	for (let i = 0; i < response.length; i++) {
		const input = response[i];

		input['Date'] = genDate();
		input['A_Job Position'] = input['Job Position'];
		input['Job Position'] = input['A_Job Position'].toLowerCase();

		console.log('Generating...' + input['Job Position']);
		await genPDF(input);
	}
}

main();
