import React, { useState } from 'react';
import { useLocation } from 'react-router';
import voteImg from '../assets/vote-twc.png';
import voteImgOverlay from '../assets/vote-twc-o.png';
import { useAnalytics } from '~/hooks/useAnalytics';
import { FaBluesky } from 'react-icons/fa6';
import { RiDiscordFill, RiTelegram2Fill } from 'react-icons/ri';

export function SocialLinks() {
  const [voteImgHover, setVoteImgHover] = useState(false);
  const location = useLocation();
  const track = useAnalytics();

  // Event handlers for analytics
  const bskyClick = () => {
    track('Bluesky', { event_category: 'Social' });
  };

  const telegramClick = () => {
    track('Telegram', { event_category: 'Social' });
  };

  const discordClick = () => {
    track('Discord', { event_category: 'Social' });
  };

  const voteClick = () => {
    track('TopWebComic', { event_category: 'Social' });
  };

  // Computed properties
  const shareUrl = () => {
    const message = encodeURIComponent(
      `Check out God Slayers Comic (@trickfoxx.bsky.social)!\nhttps://www.godslayerscomic.com${location.pathname}`,
    );
    return 'https://bsky.app/intent/compose?text=' + message;
  };

  const voteImgRollover = voteImgHover ? voteImgOverlay : voteImg;

  return (
    <div>
      <div className="group mt-8 text-center">
        <a
          href={shareUrl()}
          onClick={bskyClick}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-400 group-hover:text-white"
        >
          <FaBluesky className="text-bsky hover:text-bsky-lighter mr-1 inline-block h-4 w-4 align-text-top" />
          Share
        </a>
      </div>
      <div className="mt-8 text-center text-gray-400">Follow for Updates!</div>
      <div className="mx-auto mt-4 text-center">
        <a
          href="https://t.me/ComicSlayers"
          onClick={telegramClick}
          target="_blank"
          rel="noreferrer"
          className="telegram"
        >
          <RiTelegram2Fill
            className="text-telegram hover:text-telegram-lighter mx-2 inline-block h-8 w-8"
            title="Telegram join @ComicSlayers"
          />
        </a>
        <a
          href="https://bsky.app/profile/trickfoxx.bsky.social"
          onClick={bskyClick}
          target="_blank"
          rel="noreferrer"
          className="bksy"
        >
          <FaBluesky
            className="text-bsky hover:text-bsky-lighter mx-2 inline-block h-7 w-7"
            title="Bluesky join @trickfoxx.bsky.social"
          />
        </a>
        <a href="https://discord.gg/HKZmH3U" onClick={discordClick} target="_blank" rel="noreferrer">
          <RiDiscordFill
            className="text-discord hover:text-discord-lighter mx-2 inline-block h-8 w-8"
            title="Join Discord Server"
          />
        </a>
      </div>
      <div className="mt-8 text-center">
        <a href="http://www.topwebcomics.com/vote/26458" onClick={voteClick} target="_blank" rel="noreferrer">
          <img
            className="mx-auto"
            src={voteImgRollover}
            onMouseOver={() => setVoteImgHover(true)}
            onMouseLeave={() => setVoteImgHover(false)}
            alt="Vote for God Slayers Comic at TopWebComics"
            title="Vote for God Slayers Comic at TopWebComics"
          />
        </a>
      </div>
    </div>
  );
}
