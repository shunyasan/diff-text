import { CheckForm } from "@/component/CheckForm";
import { Box, Paper, Stack, Text, Title } from "@mantine/core";

export default async function Page() {
	return (
		<Box>
			<Paper m={20} shadow="sm" radius="md" p="xl" withBorder>
				<Stack gap={10}>
					<Title order={1} size="h2">
						📄 Document Diff Tool
					</Title>
					<Text c="dimmed" size="md">
						PDFまたはWordファイルを2つ選択して比較します。
					</Text>
				</Stack>
				<CheckForm />
			</Paper>
		</Box>
	);
}
