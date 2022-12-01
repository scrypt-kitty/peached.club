export function kelvinToFahrenheit(tempK: number) {
	return Math.floor(((tempK - 273.15) * 9) / 5 + 32);
}
