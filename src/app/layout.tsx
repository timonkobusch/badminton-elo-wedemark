import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Badminton Wedemark',
    description: 'Eine Webapp, um Spiele zu tracken',
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
