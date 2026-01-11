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
		Title: { defaultProps: { fz: { base: 18, xs: 22 } } },
		Button: { defaultProps: { color: "orange" } },
		ActionIcon: { defaultProps: { color: "orange" } },
		Anchor: { defaultProps: { fw: "bold", td: "none" } },
		Text: { defaultProps: { c: "#333", fz: { base: 15, xs: 16 } } },
		ListItem: { defaultProps: { c: "#333", fz: { base: 15, xs: 16 } } },
		Modal: {
			defaultProps: {
				removeScrollProps: { allowPinchZoom: true }, // スマホでのズームを許可
			},
		},
	},
});

export const ICON_COLOR = {
	red: "#e20000",
	green: "#67c61e",
	orange: "#ff9500",
	purple: "#a400bd",
	brawn: "#c39200",
	blue: "#0034d2",
	gray: "#999999",
	pink: "#e511d7",
} as const;

export const STRIPE_COLOR = "#6772e5";

export const getMantineColor = (color: string, shade?: number) =>
	`var(--mantine-color-${color}-${shade || 6})`;
