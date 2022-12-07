import {
	POST_TYPE,
	ImageMessage,
	UploadableMessageTypes,
} from '../../../api/interfaces';

const HTML_NEWLINE_START = `<p><br>`;
const HTML_P_START = `<p>`;
const HTML_P_END = `</p>`;
const HTML_IMG_START = `<img src="`;
const HTML_IMG_END = `">`;

const getImageMessagesFromHTML = (
	text: string,
	uploadedImages: { [key: string]: ImageMessage }
): ImageMessage[] => {
	const imgMessages: ImageMessage[] = [];
	let curText = text;
	while (curText.length > 0) {
		const startImgIndex = curText.indexOf(HTML_IMG_START);

		if (startImgIndex < 0) {
			break;
		}

		const endImgIndex = curText.indexOf(HTML_IMG_END);
		const src = curText.slice(HTML_IMG_START.length, endImgIndex);
		const uploadedImage = uploadedImages[src];
		if (uploadedImage) {
			const im: ImageMessage = {
				type: POST_TYPE.IMAGE,
				src,
				height: uploadedImage.height,
				width: uploadedImage.width,
			};

			imgMessages.push(im);
		}

		curText = curText.slice(endImgIndex + HTML_IMG_END.length);
	}

	return imgMessages;
};

export const parseHTMLForUpload = (
	postText: string,
	uploadedImages: { [key: string]: ImageMessage }
) => {
	let p: UploadableMessageTypes[] = [];
	// remove extra newlines
	const regex = /(<p><br><\/p>){2,}/;
	let curText = postText
		.replace(regex, `<p><br></p>`)
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&nbsp;/g, ' ')
		.replace(/<a href="/g, '')
		.replace(/" rel="noopener noreferrer" target="_blank">/g, '')
		.replace(/<\/a>/g, '')
		.replace(/<(\/)?(strong|em|ul|i)>/g, '')
		.replace(/<(\/)?(u)>/g, '')
		.replace(/<li>/g, '<p>• ')
		.replace(/<\/li>/g, '</p>');

	let curImgIndex = curText.indexOf(HTML_IMG_START);
	// add p tags around all images, if there are none
	while (true) {
		if (curImgIndex < 0) {
			break;
		}

		const thisPart = curText.slice(curImgIndex);

		const prevPartCheck2 = curText.slice(curImgIndex - 4, curImgIndex);
		if (prevPartCheck2 === '</p>') {
			curText = curText.slice(0, curImgIndex) + '<p>' + thisPart;
			curImgIndex += 3;
		} else {
			const prevPartCheck1 = curText.slice(curImgIndex - 3, curImgIndex);
			if (prevPartCheck1 !== '<p>') {
				curText = curText.slice(0, curImgIndex) + '</p><p>' + thisPart;
				curImgIndex += 7;
			}
		}

		const relativeEndImgIndex = thisPart.indexOf(HTML_IMG_END);

		// weird case
		if (relativeEndImgIndex < 0) {
			console.error(`Hmm... an image was broken.`);
			break;
		}

		let nextPartStartIndex = curImgIndex + relativeEndImgIndex + 2;
		const nextPartCheck1 = curText.slice(
			nextPartStartIndex,
			nextPartStartIndex + 3
		);
		const nextPartCheck2 = curText.slice(
			nextPartStartIndex,
			nextPartStartIndex + 4
		);

		const theRest = curText.slice(nextPartStartIndex);
		if (nextPartCheck1 === '<p>') {
			curText = curText.slice(0, nextPartStartIndex) + '</p>' + theRest;
			nextPartStartIndex += 4;
		} else {
			if (nextPartCheck2 !== '</p>') {
				curText =
					curText.slice(0, nextPartStartIndex) +
					'</p><p>' +
					curText.slice(nextPartStartIndex);

				nextPartStartIndex += 7;
			}
		}

		const nextImgRelativeIndex = curText
			.slice(nextPartStartIndex)
			.indexOf(HTML_IMG_START);

		if (nextImgRelativeIndex < 0) {
			break;
		}

		curImgIndex = nextPartStartIndex + nextImgRelativeIndex;
	}

	while (curText.length > 0) {
		const startTextIndex = curText.indexOf(HTML_P_START);

		if (startTextIndex < 0) {
			break;
		}

		const endTextIndex = curText.indexOf(HTML_P_END);

		const elementContent = curText
			.slice(HTML_P_START.length, endTextIndex)
			.trim();

		const startImgIndex = elementContent.indexOf(HTML_IMG_START);
		if (elementContent.length > 0) {
			if (startImgIndex === 0) {
				// handle images
				const imageMessages = getImageMessagesFromHTML(
					elementContent,
					uploadedImages
				);
				p = [...p, ...imageMessages];
			} else {
				const startLineBreakIndex = curText.indexOf(HTML_NEWLINE_START);
				const lastPostPart = p[p.length - 1];
				if (
					startLineBreakIndex === 0 &&
					lastPostPart &&
					lastPostPart.type === POST_TYPE.TEXT
				) {
					if (lastPostPart) p.pop();
					p.push({
						...lastPostPart,
						text: lastPostPart.text + `\n`,
					});
				} else {
					p.push({
						type: POST_TYPE.TEXT,
						text: elementContent.replace(`<br>`, `\n`),
					});
				}
			}
		}
		curText = curText.slice(endTextIndex + 4);
	}

	// when the composer content is actually empty
	if (p.length === 1 && p[0].type === POST_TYPE.TEXT && p[0].text === `\n`) {
		return [];
	}

	return p;
};
