<template>
  <div class="h-full">
    <header class="relative text-center mx-auto">
      <img class="w-screen" src="./assets/title_banner.png" alt="God Slayers Comic">
      <a href="#" v-scroll-to="'#top'">
        <svg
            class="animated pulse infinite slower fill-current text-white opacity-50 inline-block relative w-12 h-12 -mt-8"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </a>
    </header>
    <div id="top" ref="top" class="container mx-auto flex flex-col items-center justify-between w-full h-full" style="max-width: 900px">
      <site-nav></site-nav>
      <router-view />
      <SocialLinks></SocialLinks>
      <footer class="text-gray-500 mt-16 text-center py-2">
        <p class="font-semibold">Comic updates (most) Wednesdays. Sketches posted Friday.</p>
        <p>Like the comic? Support me on
          <a href="https://www.patreon.com/elitetrick" target="_blank" class="text-patreon hover:text-white">
            <svg class="fill-current inline-block w-4 h-4 align-text-top" role="img" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"><title>Patreon icon</title>
              <path
                  d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
            </svg>
            Patreon
          </a>
        </p>
        <p class="mt-8 mb-4">Copyright &copy; {{ new Date().getFullYear() }} Steven Lloyd. All rights reserved</p>
      </footer>
    </div>
  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import SocialLinks from "@/components/SocialLinks";

export default {
  name: "app",
  components: {
    SiteNav,
    SocialLinks
  }
}
</script>

<style scoped>
</style>
