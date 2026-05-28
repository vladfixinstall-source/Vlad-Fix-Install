// Google Tag Manager — canonical two-tag installation for Next.js
// App Router. Triggers, tags and variables are all configured in the
// GTM dashboard; this module only loads the container.
//
// GTM ID is sourced from NEXT_PUBLIC_GTM_ID env var with a hardcoded
// fallback to the live container — so the integration keeps working
// even if the env var is forgotten during a deploy.

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-THW3BR83";

/**
 * Inline boot script. Rendered inside <head> so it loads as early as
 * the App Router allows. `strategy="afterInteractive"` is the
 * recommended approach for GTM in Next.js: the script runs after
 * hydration starts, which avoids blocking first paint while still
 * firing before any meaningful user interaction.
 */
export function GoogleTagManagerScript() {
  if (!GTM_ID) return null;
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}

/**
 * Fallback iframe for users with JavaScript disabled. GTM requires
 * this to complete page-view tracking for the JS-off audience. Must
 * be rendered as the very first child of <body>.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
