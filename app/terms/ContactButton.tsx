'use client';

export default function ContactButton() {
    const handleContactClick = () => {
        window.location.href = 'mailto:matulchaubey669@gmail.com?subject=Project%20Inquiry&body=Hello%20Saptash,%0D%0A%0D%0AI%27m%20interested%20in%20discussing%20a%20potential%20project%20with%20you.%0D%0A%0D%0AProject%20Details:%0D%0A%0D%0ABudget:%0D%0ATimeline:%0D%0A%0D%0ALooking%20forward%20to%20your%20response!';
    };

    return (
        <button
            onClick={handleContactClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
            Get in Touch
        </button>
    );
}