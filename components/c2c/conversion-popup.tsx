"use client"

import Script from "next/script"

/**
 * MailerLite popup integration.
 *
 * Loads the MailerLite Universal JS which handles popup display automatically
 * based on the triggers configured in the MailerLite dashboard (exit-intent,
 * time delay, scroll %, etc.).
 *
 * To configure the popup behaviour:
 * 1. Log in to your MailerLite dashboard
 * 2. Go to Sites > Pop-ups
 * 3. Create/edit a popup form
 * 4. Under "Visibility" set triggers:
 *    - "Exit intent" for desktop exit-intent
 *    - "Time on page" (e.g. 15 seconds) for timed display
 *    - Configure mobile triggers separately
 * 5. Publish the popup -- the Universal script below will handle the rest.
 */

const ML_ACCOUNT_ID = "1640091"

export function ConversionPopup() {
  return (
    <Script
      id="mailerlite-universal"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,e,u,f,l,n){
            w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
            l=d.createElement(e);l.async=1;l.src=u;
            n=d.getElementsByTagName(e)[0];n.parentNode.insertBefore(l,n);
          })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '${ML_ACCOUNT_ID}');
        `,
      }}
    />
  )
}
