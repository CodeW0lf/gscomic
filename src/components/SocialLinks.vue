<template>
  <div>
    <div class="mt-8 text-center group">
      <a
          :href="shareUrl"
          @click="twitterClick"
          target="_blank"
          class="text-gray-400 group-hover:text-white text-sm"
      >
        <svg
            class="fill-current text-twitter group-hover:text-twitter-lighter inline-block w-4 h-4 align-text-top"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <title>Twitter Share</title>
          <path
              d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
          />
        </svg>
        Share
      </a>
    </div>
    <div class="mt-8 text-gray-400 text-center">Follow for Updates!</div>
    <div class="mt-4 mx-auto text-center">
      <a
          href="https://t.me/ComicSlayers"
          @click="telegramClick"
          target="_blank"
          class="telegram"
      >
        <svg
            class="fill-current text-telegram hover:text-telegram-lighter inline-block w-8 h-8 mx-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
          <title>Telegram Join @ComicSlayers</title>
          <path
              d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"
          />
        </svg>
      </a>
      <a
          href="https://bsky.app/profile/trickfoxx.bsky.social"
          @click="bskyClick"
          target="_blank"
          class="bksy"
      >
        <svg class="fill-current text-bsky hover:text-bsky-lighter inline-block w-8 h-8 mx-2"
             role="img"
             width="24"
             height="24"
             viewBox="0 0 600 530"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
        </svg>
      </a>
      <a
          href="https://twitter.com/ComicSlayers"
          @click="twitterClick"
          target="_blank"
          class="twitter"
      >
        <svg
            class="fill-current text-twitter hover:text-twitter-lighter inline-block w-8 h-8 mx-2"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <title>Twitter Follow @ComicSlayers</title>
          <path
              d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
          />
        </svg>
      </a>
      <a
          href="https://discord.gg/HKZmH3U"
          @click="discordClick"
          target="_blank"
      >
        <svg
            class="fill-current text-discord hover:text-discord-lighter inline-block w-8 h-8 mx-2"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <title>Join Discord Server</title>
          <path
              d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
          />
        </svg>
      </a>
    </div>
    <div class="mt-8 text-center">
      <a
          href="http://www.topwebcomics.com/vote/26458"
          @click="voteClick"
          target="_blank"
      >
        <img
            class="mx-auto"
            :src="voteImgRollover"
            @mouseover="voteImgHover = true"
            @mouseleave="voteImgHover = false"
            alt="Vote for God Slayers Comic at TopWebComics"
            title="Vote for God Slayers Comic at TopWebComics"
        />
      </a>
    </div>
  </div>
</template>

<script>
import voteImg from '@/assets/vote-twc.png'
import voteImgOverlay from '@/assets/vote-twc-o.png'

export default {
  name: 'SocialLinks',
  data() {
    return {
      voteImgHover: false,
      voteImg: voteImg,
      voteImgO: voteImgOverlay,
    }
  },
  methods: {
    discordClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'Discord', {event_category: 'Social'})
    },
    bskyClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'Bluesky', {event_category: 'Social'})
    },
    twitterClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'Twitter', {event_category: 'Social'})
    },
    telegramClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'Telegram', {event_category: 'Social'})
    },
    voteClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'TopWebComic', {event_category: 'Social'})
    },
  },
  computed: {
    shareUrl() {
      let message = encodeURIComponent(
          'Check out God Slayers Comic (@ComicSlayers)!'
      )
      return (
          'https://twitter.com/intent/tweet?url=https://www.godslayerscomic.com' +
          this.$route.path +
          '&text=' +
          message
      )
    },
    voteImgRollover() {
      return this.voteImgHover ? this.voteImgO : this.voteImg
    },
  },
}
</script>

<style scoped></style>
