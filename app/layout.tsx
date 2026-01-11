import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

import {
	ColorSchemeScript,
	mantineHtmlProps,
	MantineProvider,
} from "@mantine/core";
import { theme } from "../theme";

type Props = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
	return (
		<html lang="ja" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
