import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "Referrer-Policy",
                  value: "no-referrer",
               },
            ],
         },
      ];
   },
};

export default nextConfig;
