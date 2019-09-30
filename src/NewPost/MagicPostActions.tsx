export const getCurrentTime = () => {
	const d = new Date();
	const [time, hour = ''] = d.toLocaleTimeString().split(' ');
	// remove the milliseconds part of the time string
	return `\n🕓 ${time.slice(0, -3)} ${hour}\n`;
};

export const getCurrentDate = () => {
	const d = new Date();
	return `\n📰 ${d.toDateString()}\n`;
};
