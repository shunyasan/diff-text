/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: false,
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};

export default nextConfig;
