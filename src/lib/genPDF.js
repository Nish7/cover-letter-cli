import authorize from '../lib/authorize.js';
import { google } from 'googleapis';
import terminalLink from 'terminal-link';
import fs from 'fs';
import os from 'os';
import consts from '../lib/consts.js';

const { templateDocId, driveDestinationFolderId } = consts;

export default async function genPDF(input) {
	const auth = await authorize();

	const fileName =
		`${input['Company']}-${input['A_Job Position']}-${input['Division_Title']}`
			.replaceAll(' ', '_')
			.replaceAll('/', '-');

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
			fileId: tempData.id,
			mimeType: 'application/pdf',
		},
		{ responseType: 'arraybuffer' }
	);

	fs.writeFileSync(
		`${os.homedir()}/Downloads/CoverLetters/${fileName}.pdf`,
		Buffer.from(data).toString('base64'),
		'base64'
	);

	const link = terminalLink(
		fileName + ' Successfully Generated!',
		`file:///Users/nish7/Downloads/CoverLetters/${fileName}.pdf`
	);

	console.log(link);
}
