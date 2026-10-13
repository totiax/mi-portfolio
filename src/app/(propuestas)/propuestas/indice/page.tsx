import { Instrument_Serif, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import Indice from "./Indice";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif" });
const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--f-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata = { title: "A · Índice — Matias Skuarok" };

export default function Page() {
  return <Indice fonts={`${serif.variable} ${sans.variable} ${mono.variable}`} />;
}
