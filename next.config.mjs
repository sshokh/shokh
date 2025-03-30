/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.discordapp.com'
            },
            {
                hostname: "heroui.com"
            }
        ]
    }
};

export default nextConfig;
