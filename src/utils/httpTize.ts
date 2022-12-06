export function httpTize(s: string | null): string {
	return s ? s.replace(/^http:\/\//g, 'https://') : '';
}
