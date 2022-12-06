const backgrounds = [
	'https://imgur.com/upR9smx.jpg',
	'https://imgur.com/FYvdKAb.jpg',
	'https://imgur.com/GRyoWfj.jpg',
	'https://imgur.com/aqfkgt5.jpg',
	'https://imgur.com/xyAcBRG.jpg',
];

const numBackgrounds = backgrounds.length;

export const getRandomBackgroundUrl = () =>
	`${backgrounds[Math.floor(Math.random() * numBackgrounds)]}`;
