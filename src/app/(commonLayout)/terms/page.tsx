"use client";
import { useTheme } from 'next-themes';
import React from 'react';

export default function TermsAndConditions() {
  const { theme } = useTheme();

  return (
    <div 
      suppressHydrationWarning  // Fix hydration warning
      className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}
    >
      <div className="w-full lg:w-3/5 mx-auto text-center pt-8 px-4 sm:px-6 md:px-8 pb-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12">
          Terms and Conditions, Privacy Policy, and Cookie Policy
        </h1>

        {/* Content Sections */}
        <div className="space-y-6 sm:space-y-8 text-left">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              By accessing or using the Star Writer platform, website, and related services (the "Service") provided
              by papermine & co, trading as Star Writer ("Star Writer," "we," "us," or "our"), you agree to be bound by
              these Terms and Conditions (the "Terms"), our Privacy Policy, and our Cookie Policy (together, the
              "Agreement"). If you do not agree to this Agreement, you must not use the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">2. About Us</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              <strong>Legal Name:</strong> papermine & co, trading as Star Writer<br />
              <strong>Address:</strong> 401 Bay Street, Toronto, Ontario, M5H 2Y4, Canada<br />
              <strong>Contact:</strong> support@starwriter.ai
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">3. Key Definitions</h2>
            <div className="text-sm sm:text-base leading-relaxed space-y-2">
              <p><strong>Platform:</strong> Our websites, web applications, APIs, and other interfaces we provide.</p>
              <p><strong>Service:</strong> Our AI-powered writing, enhancement, and humanization tools.</p>
              <p><strong>Account:</strong> An end-user profile registered with the Service.</p>
              <p><strong>User / You:</strong> The individual or entity accessing or using the Service.</p>
              <p><strong>User Content:</strong> Content submitted by you (e.g., prompts, files, inputs).</p>
              <p><strong>Outputs:</strong> Text or content generated or enhanced by the Service in response to your inputs.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">4. Eligibility and Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>You must be of legal age in your jurisdiction (or have valid parental/guardian consent, if applicable).</li>
              <li>You must provide accurate registration information and keep it updated.</li>
              <li>You are responsible for all activity under your Account.</li>
              <li>We reserve the right to suspend or terminate Accounts for breach of these Terms, fraud, or unlawful activity.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">5. Description of Services</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Star Writer provides AI-driven writing tools to refine, edit, and humanize text. Outputs are generated for
              convenience and should not be relied upon as professional, legal, medical, financial, or academic
              advice. You are solely responsible for fact-checking and verifying the accuracy of any Outputs.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">6. Fair Use, Accuracy, and Responsibility for Outputs</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>Outputs may contain inaccuracies, incomplete information, or unsuitable content.</li>
              <li>The Service must not be used in high-risk domains (e.g., medical, legal, emergency response, life-support).</li>
              <li>You are fully responsible for ensuring compliance with academic integrity rules, institutional policies, and applicable laws.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">7. Acceptable Use and Prohibited Conduct</h2>
            <p className="mb-2 text-sm sm:text-base">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>Break any laws or infringe intellectual property, data protection, or privacy rights.</li>
              <li>Upload malware, spam, or otherwise disrupt our systems.</li>
              <li>Generate unlawful, harmful, discriminatory, or abusive content.</li>
              <li>Misrepresent Outputs as wholly original where disclosure is required (e.g., academic work).</li>
              <li>Scrape, reverse-engineer, or attempt to bypass technical or security controls.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">8. Pricing, Billing, and Subscriptions</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>All prices are listed in USD unless otherwise stated.</li>
              <li>Payments are processed securely through authorized third-party providers.</li>
              <li>Subscriptions automatically renew unless cancelled before the billing cycle ends.</li>
              <li>Applicable taxes may be charged based on your jurisdiction.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">9. User Content and Outputs</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>You retain ownership of your User Content.</li>
              <li>By using the Service, you grant us a non-exclusive, royalty-free license to process, store, and host your content for the purpose of operating and improving the Service.</li>
              <li>We may remove or restrict content that violates these Terms or applicable laws.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">10. Intellectual Property and Feedback</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>All rights to the Service, models, software, and branding remain owned by Star Writer.</li>
              <li>Any feedback, suggestions, or improvements you provide may be used by us freely and without obligation.</li>
            </ul>
          </section>

          {/* Privacy Policy Header */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Privacy Policy</h1>
          </div>

          {/* Section 11 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">11. Data We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li><strong>Information you provide:</strong> Account details, billing/payment information, and contact details.</li>
              <li><strong>Content you submit:</strong> Prompts, files, and other User Content.</li>
              <li><strong>Technical data:</strong> Cookies, device information, and analytics data.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">12. How We Use Data</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>To provide, maintain, and improve the Service.</li>
              <li>To process payments and manage billing/subscriptions.</li>
              <li>To communicate with you regarding service updates or support.</li>
              <li>With your consent, to send promotional or marketing communications (you may unsubscribe at any time).</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">13. Sharing Your Data</h2>
            <p className="mb-2 text-sm sm:text-base">We may share your data:</p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>With trusted third-party service providers (e.g., payment processors, hosting, analytics).</li>
              <li>Where required by law or government request.</li>
              <li>In the event of a business transfer (e.g., merger, sale, or reorganization).</li>
            </ul>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">14. Data Location and Security</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>Data may be stored and processed in Canada or other jurisdictions.</li>
              <li>We implement industry-standard safeguards, but no system is fully secure.</li>
              <li>You use the Service at your own risk.</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">15. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li>You may request access, correction, or deletion of your personal data, subject to legal limitations.</li>
              <li>Contact us at support@starwriter.ai to exercise your rights.</li>
            </ul>
          </section>

          {/* Cookie Policy Header */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Cookie Policy</h1>
          </div>

          {/* Section 16 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">16. What Are Cookies?</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Cookies are small text files stored on your device to enable website functionality and improve user experience.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">17. Types of Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed pl-2 sm:pl-0">
              <li><strong>Strictly necessary:</strong> Essential for site features (e.g., login, authentication).</li>
              <li><strong>Functional:</strong> Save preferences such as language and region.</li>
              <li><strong>Analytics:</strong> Help us understand usage and improve performance.</li>
              <li><strong>Advertising:</strong> Used for delivering relevant ads (if enabled).</li>
            </ul>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">18. Managing Cookies</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              You may disable or delete cookies via your browser settings. Please note that some Service features
              may not work properly without cookies enabled.
            </p>
          </section>

          {/* Additional Legal Terms Header */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Additional Legal Terms</h1>
          </div>

          {/* Section 19 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">19. Service Availability and Maintenance</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              The Service is provided on an "as available" basis. Features may be changed, updated, or discontinued
              at any time.
            </p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">20. Warranties and Disclaimers</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              The Service and Outputs are provided "as is" and "as available." No warranties are made regarding
              accuracy, reliability, merchantability, or fitness for a particular purpose.
            </p>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">21. Limitation of Liability</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              To the fullest extent permitted by law, our liability is limited to the greater of CAD $100 or the total fees
              you paid to us in the three months preceding the claim.
            </p>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">22. Indemnification</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              You agree to indemnify and hold harmless Star Writer, its affiliates, and its personnel from any claims,
              damages, or expenses arising out of your misuse of the Service.
            </p>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">23. Governing Law</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              This Agreement shall be governed by the laws of Ontario and applicable Canadian federal law. All
              disputes shall be resolved exclusively in the courts of Toronto, Ontario.
            </p>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">24. Contact</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              papermine & co, trading as Star Writer<br />
              401 Bay Street, Toronto, Ontario, M5H 2Y4, Canada<br />
              Email: support@starwriter.ai
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
