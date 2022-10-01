<template>
  <div class="h-full">
    <header class="relative text-center mx-auto">
      <img
        class="w-screen"
        src="./assets/title_banner.png"
        alt="God Slayers Comic"
      />
      <a href="#" v-scroll-to="'#top'">
        <svg
          class="animated pulse infinite slower fill-current text-white opacity-40 inline-block relative w-12 h-12 -mt-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </a>
    </header>
    <div
      id="top"
      ref="top"
      class="container mx-auto flex flex-col items-center justify-between w-full h-full"
      style="max-width: 900px"
    >
      <site-nav></site-nav>
      <router-view />
      <social-links></social-links>
      <footer class="text-gray-400 mt-16 text-center py-2">
        <site-footer />
      </footer>
    </div>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import SocialLinks from '@/components/SocialLinks.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
  name: 'app',
  components: {
    SiteFooter,
    SiteNav,
    SocialLinks,
  },
}
</script>
