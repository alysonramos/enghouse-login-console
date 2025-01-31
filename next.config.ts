import type { NextConfig } from "next";



const nextConfig: NextConfig = {
    eslint: {
        dirs: ['pages', 'utils','components'],
    },
    // i18n: {
    //     locales: ['en-US', 'pt-BR'],
    //     defaultLocale: 'en-US',
    // },
};

export default nextConfig;
