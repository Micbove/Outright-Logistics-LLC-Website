import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "OUTRIGHT LOGISTICS",
    template: "%s | OUTRIGHT LOGISTICS"
  },
  description:
    "Operations-first logistics and supply chain consulting. Execution, cost visibility, vendor coordination, and operational clarity."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

