import "./globals.css";

export const metadata = {
  title: "FG & S.M Fitness Gym - Membership Registration",
  description: "Official Registration Portal for FG & S.M Fitness Gym. Owners: Saqib Mehmood & Ali Daud.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen selection:bg-amber-500/20 selection:text-amber-300">
        {children}
      </body>
    </html>
  );
}
