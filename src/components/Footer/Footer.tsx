import * as React from 'react';

import Link from 'next/link';

function Footer(): JSX.Element {
  return (
    <footer className="w-full max-w-7xl mx-auto
      px-16 py-12
      opacity-50
      text-lg
      space-y-6 md:space-y-0
      flex flex-col items-center md:flex-row md:justify-between">
      <p className="tracking-tight">
        Made with love by Namchee
      </p>

      <div className="flex space-x-8">
        <Link href="/privacy">
          <a className="underline">
            Privacy Policy
          </a>
        </Link>
        <Link href="https://github.com/Namchee/pleasantcord">
          <a
            className="underline"
            target="_blank"
            aria-label="GitHub"
            rel="noopener noreferrer">
            GitHub
          </a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
