import prompts from 'prompts';
import consts from './lib/consts.js';
import genPDF from './lib/genPDF.js';

const { fields } = consts;

(async () => {
	let response = await prompts(fields);
	response['Job Position'] = response['A_Job Position'].toLowerCase();
	genPDF(response);
	console.log('Generating...');
})();
