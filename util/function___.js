"use server";

import AsposePdf from "asposepdfnodejs";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import fs from "fs";

const AsposePdfModule = await AsposePdf();

export const convertPdfToText = async (arrayBuffer) => {
	const filePath = `tmp/${randomUUID()}.pdf`;
	await writeFile(filePath, Buffer.from(arrayBuffer));
	const textResult = await AsposePdfModule.AsposePdfExtractText(filePath);
	fs.unlinkSync(filePath);
	//
	const text = textResult.extractText.trim();
	const pageNumRegex = /[\s\t]{10,}\d+$/;
	if (pageNumRegex.test(text)) {
		console.log("ページ番号が検出されたので削除します");
		return text.replace(pageNumRegex, "");
	}
	return text;
};

// export const pdfToDocx = async (file) => {
// 	const filePath = `tmp/${randomUUID()}.pdf`;
// 	const arrayBuffer = await file.arrayBuffer();
// 	await writeFile(filePath, Buffer.from(arrayBuffer));
// 	/*Convert a PDF-file to DocX and save the "ResultPDFtoDocX.docx"*/
// 	const docxPath = filePath.replace(/\.pdf$/, ".docx");
// 	const json = await AsposePdfModule.AsposePdfToDocX(filePath, docxPath);

// 	if (json.errorCode !== 0) return;
// 	const docxBuffer = await readFile(json.fileNameResult);
// 	return docxBuffer.buffer;
// };
