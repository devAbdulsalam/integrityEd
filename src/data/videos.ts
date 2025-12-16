export const videos = [
	{
		id: 1,
		title: 'module1',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Actual+module-1.mp4',
		other: [
			'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module+-1+remake.mp4',
			'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/2nd+character-Module+1.mp4',
		],
	},

	{
		id: 2,
		title: 'module2',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module+2+.mp4',
	},

	{
		id: 3,
		title: 'module3',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module+3.mp4',
	},

	{
		id: 4,
		title: 'module4',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/2nd+character+Module+4.mp4',
	},

	{
		id: 5,
		title: 'module5',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 6,
		title: 'module6',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 7,
		title: 'module7',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 8,
		title: 'module8',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 9,
		title: 'module9',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 10,
		title: 'module10',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 11,
		title: 'module11',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 12,
		title: 'module12',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 13,
		title: 'module13',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
	{
		id: 14,
		title: 'module14',
		url: 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Module-5.mp4',
	},
];

export const getVideoUrlByTitle = (title: string) => {
	const video = videos.find((video) => video.title === title);
	if (video) {
		return video.url;
	}
	return 'https://hackathon-dev-stemslab.s3.us-east-1.amazonaws.com/content/Actual+module-1.mp4';
};
