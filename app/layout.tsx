import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Norbu The Montanna, Dharamshala | SeleQtions', description: 'A timeless retreat beneath the snow-capped peaks.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }
