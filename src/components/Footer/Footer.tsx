import * as React from 'react';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

function Footer(): JSX.Element {
  return (
    <footer className="w-full max-w-7xl mx-auto
      px-16 py-12
      opacity-50
      space-y-6 md:space-y-0
      flex flex-col items-center md:flex-row md:justify-between">
      <p className="tracking-tight text-lg">
        Made with love by Namchee
      </p>
      <p>
        <a href="https://github.com/Namchee/pleasantcord"
          target="_blank"
          rel="noopener noreferrer">
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;
