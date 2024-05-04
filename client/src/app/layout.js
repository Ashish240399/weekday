import "./globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Get your dream job",
  description: "Generated Weekday",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <div className="bg-white h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
