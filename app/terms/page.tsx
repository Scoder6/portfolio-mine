import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service | Your Portfolio',
    description: 'Terms and conditions for using this portfolio website',
};

export default function TermsPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="prose prose-lg dark:prose-invert">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p>
                        Welcome to my portfolio website. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
                    <p>
                        All content on this website, including but not limited to text, graphics, logos, and images, is my property or the property of my licensors and is protected by copyright laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                    <p>
                        You may not modify or copy the materials, use them for any commercial purpose, or remove any copyright or other proprietary notations.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
                    <p>
                        The materials on this website are provided "as is". I make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with the laws of your country/state without regard to its conflict of law provisions.
                    </p>
                </section>

                <div className="mt-12">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}