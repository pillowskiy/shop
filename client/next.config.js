/** @type {import('next').NextConfig} */
const nextConfig = {
	// https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js
	webpack(config, options) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack', 'url-loader']
		})

		return config
	},
	reactStrictMode: false,
	experimental: {
		typedRoutes: true
	},
	images: {
		domains: ['localhost'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	env: {
		API_URL: process.env.API_URL,
		APP_URL: process.env.APP_URL
	}
}

module.exports = nextConfig
