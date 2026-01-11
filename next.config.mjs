/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: false,
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
		serverActions: {
			bodySizeLimit: "30mb", // localで動かす前提なため
		},
	},
};

export default nextConfig;
