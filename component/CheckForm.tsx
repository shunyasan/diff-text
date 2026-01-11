"use client";

import { convertPdfToText } from "@/util/function___";
import { convertDocxToPdf, createTmpDir, getPdfByPage } from "@/util/function";
import {
	Box,
	Button,
	FileInput,
	SimpleGrid,
	Stack,
	Title,
} from "@mantine/core";
import * as Diff from "diff";
import { memo, useCallback, useState } from "react";

type DiffResult = {
	base: string;
	compare: string;
};

const CheckFormCmp = () => {
	const [baseFile, setBaseFile] = useState<File | null>(null);
	const [compareFile, setCompareFile] = useState<File | null>(null);
	const [diffResult, setDiffResult] = useState<DiffResult>();
	const [isLoading, setIsLoading] = useState(false);

	const convert = useCallback(async (file: File) => {
		const ext = file.name.split(".").pop()?.toLowerCase();
		const arrayBuffer = await file.arrayBuffer();

		const pdfBuffer =
			ext === "docx" ? await convertDocxToPdf(arrayBuffer, ext) : arrayBuffer;
		const pages = await getPdfByPage(pdfBuffer);
		const txtArr = [];
		for (const page of pages) {
			const txt = await convertPdfToText(page);
			if (txt) {
				txtArr.push(txt);
			}
		}
		const chars = txtArr
			.join("")
			.normalize("NFKC") // 全角英数を半角に、等の規格統一
			.replace(/[\u2ED1]/g, "長")
			.split("\n");

		const emptyRegex = /[ \t　]+/g;
		const viewText = chars
			.map((line, i) => {
				const trimmed = line.trim().replace(emptyRegex, "");
				const nextLine = chars[i + 1]?.trim().replace(emptyRegex, "");

				if (!trimmed) {
					if (!nextLine) return ""; // 次もからなら改行削除
					return "\n";
				}

				const headRegex = [/^第?\d{1,3}\./, /^[【\(\[]/];
				if (headRegex.some((h) => h.test(nextLine))) {
					return trimmed + "\n";
				}
				return trimmed.trimEnd();
			})
			.join("");
		return viewText;
	}, []);

	/**
	 * 差分を計算してHTMLを生成
	 */
	const calculateDiff = useCallback(
		(textOld: string, textNew: string): DiffResult => {
			const diff = Diff.diffChars(textOld, textNew);

			let base = "";
			let compare = "";
			const excludes = ["\n"];

			diff.forEach((part) => {
				// console.log("Diff part:", part.value, part.value.charCodeAt(0));
				if (part.removed && !excludes.includes(part.value)) {
					// 削除された部分は左側（比較元）のみに表示
					base += `<span class="removed">${part.value}</span>`;
				} else if (part.added && !excludes.includes(part.value)) {
					// 追加された部分は右側（比較先）のみに表示
					compare += `<span class="added">${part.value}</span>`;
				} else {
					// 共通部分は両方に表示
					base += `<span>${part.value}</span>`;
					compare += `<span>${part.value}</span>`;
				}
			});

			return { base, compare };
		},
		[]
	);

	const handleSubmit = useCallback(async () => {
		if (isLoading) return;
		if (!baseFile || !compareFile) {
			alert("ファイルを選択してください");
			return false;
		}

		setIsLoading(true);
		try {
			await createTmpDir();
			// テキストを抽出
			const baseText = await convert(baseFile);
			const compareText = await convert(compareFile);
			// 差分を計算
			const result = calculateDiff(baseText, compareText);
			setDiffResult(result);
		} catch (error) {
			console.error("Error during comparison:", error);
			alert("エラーが発生しました: " + (error as Error).message);
		} finally {
			setIsLoading(false);
		}

		return true;
	}, [baseFile, compareFile, isLoading]);

	return (
		<>
			<Stack>
				<SimpleGrid cols={2} spacing="lg" mt={20}>
					<FileInput label="比較元" value={baseFile} onChange={setBaseFile} />
					<FileInput
						label="比較先"
						value={compareFile}
						onChange={setCompareFile}
					/>
				</SimpleGrid>
				<Button
					size="lg"
					type="button"
					onClick={handleSubmit}
					loading={isLoading}
					disabled={isLoading}
				>
					比較
				</Button>

				{diffResult && (
					<Box mt={30}>
						<Title
							order={2}
							mb={20}
							style={{
								borderLeft: "5px solid #007bff",
								paddingLeft: "10px",
								fontSize: "18px",
							}}
						>
							比較結果
						</Title>

						<SimpleGrid cols={2} spacing="lg">
							{[
								{ title: "比較元", content: diffResult.base },
								{ title: "比較先", content: diffResult.compare },
							].map((item, i) => (
								<Box
									key={i}
									p={15}
									bd={"1px solid #ddd"}
									bdrs={"4px"}
									bg={"#fafafa"}
								>
									<Title
										order={3}
										mb={15}
										pb={10}
										fz={16}
										style={{
											borderBottom: "2px solid #007bff",
										}}
									>
										📝 {item.title}
									</Title>
									<div
										dangerouslySetInnerHTML={{ __html: item.content }}
										style={{
											whiteSpace: "pre-wrap",
											wordWrap: "break-word",
											lineHeight: "1.8",
										}}
									/>
								</Box>
							))}
						</SimpleGrid>
					</Box>
				)}
			</Stack>

			<style jsx>{`
				:global(.added) {
					background-color: #e6ffed;
					color: #22863a;
					font-weight: bold;
					padding: 2px;
				}
				:global(.removed) {
					background-color: #ffeef0;
					color: #cb2431;
					text-decoration: line-through;
					padding: 2px;
				}
			`}</style>
		</>
	);
};
export const CheckForm = memo(CheckFormCmp);
