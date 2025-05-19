import React from 'react';
import deridealBanner from '../assets/banner-vote-derideal.png';

export function LinksPage() {
  return (
    <section className="h-full min-h-[24rem] text-white">
      <div className="mt-12 flex h-full flex-col items-center justify-center gap-8">
        <div className="prose">
          <h2>Recommended Comics</h2>
        </div>
        <div>
          <a href="https://derideal.com/" target="_blank" rel="noopener noreferrer">
            <img src={deridealBanner} alt="Derideal Banner" className="h-auto max-w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default LinksPage;
