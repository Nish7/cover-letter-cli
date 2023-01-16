const genDate = require('./genDate');

module.exports = {
	templateDocId: '1YBaMSiWsOdvinTuNzPtpSZsRw7cXLx7R3ylWKRD7GpM',
	driveDestinationFolderId: '18m0_mN-N4_yp0kI1oQ71ENl-Ajb8AW7l',
	fields: [
		{ type: 'text', name: 'Date', message: 'Date: ', initial: genDate() },
		{
			type: 'text',
			name: 'A_Job Position',
			message: 'A_Job Position: ',
			initial: '',
		},
		{
			type: 'text',
			name: 'Hiring Manager',
			message: 'Hiring Manager: ',
			initial: 'Hiring Manager',
		},
		{ type: 'text', name: 'Company', message: 'Company: ', initial: '' },
		{
			type: 'text',
			name: 'Referral',
			message: 'Referral: ',
			initial: 'job board',
		},
		{
			type: 'text',
			name: 'Job Description',
			message: 'Job Description: ',
			initial: 'software development',
		},
		{
			type: 'text',
			name: 'Improving Points',
			message: 'Improving Points: ',
			initial:
				'joining a high performing team of collaborators to deliver quality software',
		},
		{ type: 'text', name: 'Division', message: 'Division: ', initial: '' },
		{
			type: 'text',
			name: 'Division_Title',
			message: 'Division_Title: ',
			initial: '',
		},
		{
			type: 'text',
			name: 'Projects',
			message: 'Projects: ',
			initial: 'projects',
		},
	],
};
