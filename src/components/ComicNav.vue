<template>
  <section class="flex justify-between items-center mx-4 text-primary">
    <div>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="First Comic"
          @click="firstComic"
          :disabled="!hasPrevComic"
      >
        <svg aria-hidden="true" focusable="false" class="navBtn transform rotate-180" role="img"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
        </svg>
      </button>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="Previous Chapter"
          @click="prevChapter"
          :disabled="!hasPrevChapter"
      >
        <svg aria-hidden="true" focusable="false" class="navBtn transform rotate-180" role="img"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path>
        </svg>
      </button>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="Previous Comic"
          @click="prevComic"
          :disabled="!hasPrevComic"
      >
        <svg aria-hidden="true" focusable="false"
             class="navBtn transform rotate-180" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
        </svg>
      </button>
    </div>

    <div>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="Next Comic"
          @click="nextComic"
          :disabled="!hasNextComic"
      >
        <svg aria-hidden="true" focusable="false"
             class="navBtn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
        </svg>
      </button>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="Next Chapter"
          @click="nextChapter"
          :disabled="!hasNextChapter"
      >

        <svg aria-hidden="true" focusable="false" class="navBtn" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path>
        </svg>
      </button>
      <button
          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700"
          aria-label="Latest Comic"
          @click="latestComic"
          :disabled="!hasNextComic"
      >
        <svg aria-hidden="true" focusable="false" class="navBtn" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
          <!--
          Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          -->
          <path fill="currentColor"
                d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import ComicNavMixin from '@/mixins/ComicNavMixin'

export default {
  name: 'ComicNav',
  mixins: [ComicNavMixin],
  computed: {
    ...mapGetters([
      'hasNextComic',
      'hasPrevComic',
      'hasNextChapter',
      'hasPrevChapter',
    ]),
  },
}
</script>

<style>
.navBtn {
  @apply fill-current h-10 w-10 inline-block mx-1;
}

@screen sm {
  .navBtn {
    @apply w-12;
  }
}
</style>
