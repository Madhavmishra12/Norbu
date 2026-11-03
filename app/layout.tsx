import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Norbu The Montanna | Dharamshala', description: 'Discover a peaceful mountain retreat in Dharamshala, with Dhauladhar views, Tibetan-inspired design and warm, thoughtful hospitality.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }
