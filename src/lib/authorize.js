const credentials = require('../credentials.json');
const token = require('../token.json');
const { google } = require('googleapis');

module.exports = function authorize() {
	const { client_secret, client_id, redirect_uris } = credentials.installed;

	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	oAuth2Client.setCredentials({ refresh_token: token.refresh_token });
	return oAuth2Client;
};
