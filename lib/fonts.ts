import localFont from "next/font/local";

export const aeroport = localFont({
  src: [
    {
      path: "../app/fonts/Aeroport-light-trial.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/Aeroport-regular-trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Aeroport-bold-trial.woff2",
      weight: "700",
      style: "normal",
    },
  ],
}); 