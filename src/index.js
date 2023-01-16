const { google } = require('googleapis');
const authorize = require('./lib/authorize');
const fs = require('fs');
const os = require('os');
const prompts = require('prompts');
const {
	fields,
	templateDocId,
	driveDestinationFolderId,
} = require('./lib/consts');

async function genPDF(input) {
	const auth = await authorize();

	const fileName = `${input['Company']}-${input['A_Job Position']}`;

	const docs = google.docs({
		version: 'v1',
		auth,
	});

	const drive = google.drive({ version: 'v3', auth });

	// Replace iterations
	const requests = Object.keys(input).map((k) => ({
		replaceAllText: {
			containsText: {
				text: `{{${k}}}`,
				matchCase: true,
			},
			replaceText: input[k],
		},
	}));

	// Template Copy

	const { data: tempData } = await drive.files.copy({
		fileId: templateDocId,
		resource: {
			name: fileName,
			parents: [driveDestinationFolderId],
		},
	});

	// Replace text
	await docs.documents.batchUpdate({
		documentId: tempData.id,
		resource: {
			requests,
		},
	});

	// Export
	const { data } = await drive.files.export(
		{
			fileId: driveResp.data.id,
			mimeType: 'application/pdf',
		},
		{ responseType: 'arraybuffer' }
	);

	fs.writeFileSync(
		`${os.homedir()}/Downloads/CoverLetters/${fileName}.pdf`,
		Buffer.from(data).toString('base64'),
		'base64'
	);

	console.log(fileName + ' Successfully Generated!');
}

(async () => {
	let response = await prompts(fields);
	response['Job Position'] = response['A_Job Position'].toLowerCase();
	genPDF(response);
	console.log('Generating...');
})();
