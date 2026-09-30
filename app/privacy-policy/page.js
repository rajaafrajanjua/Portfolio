import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Raja Afra Janjua's portfolio website. Learn how we handle your data when you use the contact form or browse this site.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: `This Privacy Policy explains how Raja Afra Janjua ("I", "me", or "my") collects, uses, and protects any information you provide when you visit this portfolio website (the "Site"). I am committed to ensuring that your privacy is protected. If you provide personal information through this Site, it will only be used in accordance with this policy. This policy is effective as of 2024 and may be updated from time to time.`,
  },
  {
    title: "2. Information I Collect",
    content: `When you use the contact form on this Site, I collect the following information:
    
• Your name — so I can address you personally in my reply.
• Your email address — so I can respond to your message.
• Your message — the content you choose to send me.

I do not collect any sensitive personal data, payment information, or account credentials. I do not require you to register or create an account to use this Site.`,
  },
  {
    title: "3. How I Use Your Information",
    content: `The information you submit through the contact form is used solely for the purpose of responding to your inquiry. Specifically:

• Your name and email are used to reply to your message directly.
• Your message is read to understand your request or question.
• I do not sell, trade, or rent your personal information to third parties.
• I do not use your information for marketing purposes unless you explicitly request it.`,
  },
  {
    title: "4. Google AdSense and Third-Party Advertising",
    content: `This website may display advertisements served by Google AdSense, a third-party advertising service provided by Google LLC. Google AdSense uses cookies and similar tracking technologies to serve ads based on your prior visits to this website and other websites on the internet.

Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the internet. You may opt out of personalised advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.

Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. These cookies do not identify you personally. You can learn more about how Google uses data when you visit a partner site by visiting https://www.google.com/policies/privacy/partners/.`,
  },
  {
    title: "5. Cookies",
    content: `This Site uses cookies to improve your browsing experience. Cookies are small text files stored on your device. The following types of cookies may be used:

• Strictly necessary cookies — required for the Site to function correctly.
• Analytics cookies — used via Google Tag Manager to understand how visitors use the Site (page views, session duration, etc.). This data is aggregated and anonymous.
• Advertising cookies — used by Google AdSense (if ads are displayed) to show relevant advertisements.

You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Disabling cookies may prevent you from taking full advantage of the website.`,
  },
  {
    title: "6. Google Analytics and Tag Manager",
    content: `This Site may use Google Tag Manager and Google Analytics to collect anonymous usage statistics, such as pages visited, time spent on the site, and browser/device type. This information helps me understand how visitors interact with the Site so I can improve it.

All data collected by Google Analytics is anonymised and does not personally identify you. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout.`,
  },
  {
    title: "7. Data Retention",
    content: `Messages submitted through the contact form are retained only as long as necessary to respond to your inquiry. I do not store contact form submissions in a database. Messages are received via email and may be retained in my email inbox as part of normal email correspondence.`,
  },
  {
    title: "8. Third-Party Links",
    content: `This Site contains links to external websites, including my GitHub profile, LinkedIn profile, published apps on the Google Play Store, and other project URLs. Once you leave this Site, I have no control over and accept no responsibility for the privacy practices or content of those external sites. I encourage you to read the privacy policies of any third-party websites you visit.`,
  },
  {
    title: "9. Security",
    content: `I take reasonable precautions to protect any information submitted through this Site. Contact form submissions are transmitted over HTTPS. However, no method of transmission over the internet is completely secure, and I cannot guarantee the absolute security of information transmitted to or from this Site.`,
  },
  {
    title: "10. Children's Privacy",
    content: `This Site is not directed at children under the age of 13. I do not knowingly collect personal information from children. If you believe that a child has submitted personal information to this Site, please contact me and I will take steps to remove that information.`,
  },
  {
    title: "11. Your Rights",
    content: `You have the right to:

• Request access to the personal data I hold about you.
• Request correction of any inaccurate data.
• Request deletion of your personal data.
• Object to processing of your personal data.
• Request that I restrict processing of your personal data.

To exercise any of these rights, please contact me at the email address listed on this Site.`,
  },
  {
    title: "12. Changes to This Policy",
    content: `I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. I encourage you to review this page periodically to stay informed about how I am protecting your information.`,
  },
  {
    title: "13. Contact",
    content: `If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact me at: afra.janjua@gmail.com`,
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm mb-8 transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-yellow-400">Policy</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: <span className="text-gray-400">January 2025</span>
          </p>
          <div className="w-20 h-1 bg-yellow-400 mt-4 rounded-full" />
        </div>

        {/* Intro */}
        <div className="p-5 rounded-xl bg-yellow-400/5 border border-yellow-400/20 mb-10">
          <p className="text-gray-400 text-sm leading-relaxed">
            Your privacy is important to me. This policy explains what information is collected when you
            visit this portfolio website, how it is used, and what choices you have. Please read it
            carefully before using the contact form or browsing this site.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
              <div className="mt-6 h-px bg-zinc-800" />
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Raja Afra Janjua. All rights reserved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm mt-4 transition-colors"
          >
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
