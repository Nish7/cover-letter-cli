import credentials from '../../credentials.json' assert { type: 'json' };
import token from '../../token.json' assert { type: 'json' };

import { google } from 'googleapis';

export default function authorize() {
	const { client_secret, client_id, redirect_uris } = credentials.installed;

	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	oAuth2Client.setCredentials({ refresh_token: token.refresh_token });
	return oAuth2Client;
}
