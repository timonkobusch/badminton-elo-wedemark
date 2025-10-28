import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Badminton Elo App',
    description: 'Die Badminton Elo App für die Wedemark',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
