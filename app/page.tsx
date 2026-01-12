import { CheckForm } from "@/component/CheckForm";
import { Box, Paper, Stack, Text, Title } from "@mantine/core";

export default async function Page() {
	return (
		<Box>
			<Stack gap={10} py={30} px={{ base: 30, sm: 60 }}>
				<Title order={1} size="h2">
					<Text component="span" fz={30} pr={5}>
						🐻
					</Text>
					Document Diff Tool
				</Title>
				<Text c="dimmed" size="md">
					PDFまたはWordファイルを2つ選択して比較します。
				</Text>
				<CheckForm />
			</Stack>
		</Box>
	);
}
