import { Geist, Geist_Mono } from "next/font/google";
import Senal from "./Senal";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--f-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata = { title: "B · Señal — Matias Skuarok" };

export default function Page() {
  return <Senal fonts={`${sans.variable} ${mono.variable}`} />;
}
