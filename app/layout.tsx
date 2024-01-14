import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultLocale } from "@/middleware";
import "./globals.css";
import { FirebaseProvider } from "@/components/providers/firebase-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    variable: "--font-inter",
});
export const metadata: Metadata = {
    title: "Cashflow Tools",
    description: "Cashflow Tools",
};

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    return (
        <html lang={params.lang ?? defaultLocale}>
            <body
                className={cn(
                    "min-h-screen w-full relative bg-[#dcd5d5] font-sans",
                    inter.variable
                )}
            >
                <FirebaseProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ModalProvider />
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </FirebaseProvider>
            </body>
        </html>
    );
}
