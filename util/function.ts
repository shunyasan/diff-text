"use server";

// import mammoth from "mammoth";
// import puppeteer from "puppeteer";
import PizZip from "pizzip";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { execSync } from "child_process";
import { randomUUID } from "crypto";

export const createTmpDir = async () => {
	if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");
};

/**
 * docxの変更履歴をすべて承諾する関数
 * @param {string} inputPath 入力ファイルパス
 * @param {string} outputPath 出力ファイルパス
 */
const docxToApprove = (arrayBuffer: ArrayBuffer): ArrayBuffer => {
	// 1. ファイルを読み込み、ZIPとして解凍
	// 2. メインの文書データ（XML）を取り出す
	const zip = new PizZip(arrayBuffer);
	const xmlContent = zip.file("word/document.xml")?.asText();
	if (!xmlContent) return arrayBuffer;

	// // 3. 挿入履歴 (<w:ins>) の処理: タグを削除し、中身のテキストだけ残す
	// const insNodes = doc.getElementsByTagName("w:ins");
	// while (insNodes.length > 0) {
	// 	const insNode = insNodes[0];
	// 	const parent = insNode.parentNode;
	// 	// 子要素（通常は <w:r> など）をすべて親に移動
	// 	while (insNode.firstChild) {
	// 		parent?.insertBefore(insNode.firstChild, insNode);
	// 	}
	// 	parent?.removeChild(insNode);
	// }

	// 4. 削除履歴 (<w:del>) の処理: タグごと完全に削除
	const doc = new DOMParser().parseFromString(xmlContent, "application/xml");
	const delNodes = Array.from(doc.getElementsByTagName("w:del"));
	for (const delNode of delNodes) {
		delNode.parentNode?.removeChild(delNode);
	}

	// 5. 編集後のXMLを文字列に戻してZIPに書き戻す
	const newXmlContent = new XMLSerializer().serializeToString(doc);
	zip.file("word/document.xml", newXmlContent);
	// 6. docxファイルとして保存
	const out = zip.generate({ type: "nodebuffer" });
	return out.buffer as ArrayBuffer;
};

export const convertDocxToPdf = async (
	arrayBuffer: ArrayBuffer,
	ext: string
) => {
	const filePath = `tmp/${randomUUID()}.${ext}`;
	const approvedDocx = docxToApprove(arrayBuffer);
	fs.writeFileSync(filePath, Buffer.from(approvedDocx));

	// pdfに変換
	execSync(`soffice --headless --convert-to pdf --outdir tmp ${filePath} `);
	const pdfPath = filePath.replace(/\.docx?$/, ".pdf");
	const pdfBuffer__ = fs.readFileSync(pdfPath);
	// 削除
	fs.unlinkSync(filePath);
	fs.unlinkSync(pdfPath);
	console.log("files deleted:", filePath, pdfPath);
	return pdfBuffer__.buffer as ArrayBuffer;

	// const { value: html } = await mammoth.convertToHtml({
	// 	buffer: Buffer.from(arrayBuffer),
	// });
	// const browser = await puppeteer.launch();

	// const page = await browser.newPage();
	// const styledHtml = `
	//   <html>
	//     <head>
	//       <style>
	//         body { font-family: "MS Mincho", "serif"; line-height: 1.6; padding: 20px; }
	//         table { border-collapse: collapse; width: 100%; }
	//         table, th, td { border: 1px solid black; }
	//         th, td { padding: 8px; text-align: left; }
	//       </style>
	//     </head>
	//     <body>${html}</body>
	//   </html>
	// `;
	// await page.setContent(styledHtml, { waitUntil: "networkidle0" });

	// // PDFを生成 (A4サイズ、マージン設定など)
	// const pdfBuffer = await page.pdf({
	// 	format: "A4",
	// 	printBackground: true,
	// 	margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
	// });
	// await browser.close();
	// return pdfBuffer.buffer as ArrayBuffer;
};

export const getPdfByPage = async (arrayBuffer: ArrayBuffer) => {
	const fileName = randomUUID();
	const filePath = `tmp/${fileName}.pdf`;
	const outputPath = `tmp/${fileName}_out.pdf`;

	fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
	try {
		execSync(`qpdf --decrypt ${filePath} ${outputPath}`);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (!e?.stderr?.includes("qpdf: operation succeeded with warnings")) {
			throw new Error("解析できないロックのファイルです");
		}
	}

	const decryptBuffer = fs.readFileSync(outputPath);
	const pdfDoc = await PDFDocument.load(decryptBuffer);
	const pageCount = pdfDoc.getPageCount();
	const pageBuffers: ArrayBuffer[] = [];
	for (let i = 0; i < pageCount; i++) {
		const newPdf = await PDFDocument.create();
		const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
		newPdf.addPage(copiedPage);

		const pdfBytes = await newPdf.save();
		pageBuffers.push(pdfBytes.buffer as ArrayBuffer);
	}

	return pageBuffers;
};
