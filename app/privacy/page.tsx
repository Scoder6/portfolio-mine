import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | Your Portfolio',
    description: 'Privacy policy for this portfolio website',
};

export default function PrivacyPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="prose prose-lg dark:prose-invert">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
                    <p>
                        This portfolio website does not collect personal information unless you voluntarily provide it through the contact form or other means.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
                    <p>
                        Any personal information collected will only be used to respond to your inquiries and will not be shared with third parties without your consent.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
                    <p>
                        This website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Third-Party Links</h2>
                    <p>
                        This website may contain links to third-party sites. I have no control over and assume no responsibility for the content or practices of these sites.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Analytics</h2>
                    <p>
                        This website may use analytics tools to collect non-personal information about visitor behavior to improve the user experience.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Your Consent</h2>
                    <p>
                        By using this website, you consent to this privacy policy. If you do not agree, please refrain from using this site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
                    <p>
                        I may update this privacy policy periodically. Any changes will be posted on this page with an updated revision date.
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