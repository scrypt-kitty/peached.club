export const getCurrentTime = (currentPostLen: number) => {
	const d = new Date();
	const [time, hour = ''] = d.toLocaleTimeString().split(' ');
	// remove the milliseconds part of the time string
	return `${currentPostLen ? '\n' : ''}🕓 ${time.slice(0, -3)} ${hour}\n`;
};

export const getCurrentDate = (currentPostLen: number) => {
	const d = new Date();
	return `${currentPostLen ? '\n' : ''}📰 ${d.toDateString()}\n`;
};
