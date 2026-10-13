import { Anton, Bricolage_Grotesque } from "next/font/google";
import Kinetico from "./Kinetico";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--f-display" });
const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-sans" });

export const metadata = { title: "C · Kinético — Matias Skuarok" };

export default function Page() {
  return <Kinetico fonts={`${display.variable} ${sans.variable}`} />;
}
