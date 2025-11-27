import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pink Pastry Palace",
  description: "Freshly baked pastries and breads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
