import { createTheme } from "@mantine/core";

export const theme = createTheme({
	/* Put your mantine theme override here */
	breakpoints: {
		xs: "30em",
		sm: "48em",
		md: "64em",
		lg: "74em",
		xl: "90em",
	},
	components: {
		// Title: { defaultProps: { fz: { base: 18, xs: 22 } } },
		// ActionIcon: { defaultProps: { color: "red" } },
		// Anchor: { defaultProps: { fw: "bold", td: "none" } },
		Button: { defaultProps: { color: "#e8382f" } },
		Text: { defaultProps: { c: "#333", fz: { base: 15, xs: 16 } } },
		ListItem: { defaultProps: { c: "#333", fz: { base: 15, xs: 16 } } },
		// Modal: {
		// 	defaultProps: {
		// 		removeScrollProps: { allowPinchZoom: true }, // スマホでのズームを許可
		// 	},
		// },
	},
});

export const getMantineColor = (color: string, shade?: number) =>
	`var(--mantine-color-${color}-${shade || 6})`;
