<template>
  <section class="flex justify-between items-center mx-4 text-primary">
    <div>
      <button  class="disabled:text-gray-800" aria-label="First Comic" @click="$emit('first-comic')"
               :disabled="!hasPrevComic">
        <svg class="navBtn transform rotate-180"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>First Comic</title>
          <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/>
        </svg>
      </button>
      <button class="disabled:text-gray-800" aria-label="Previous Chapter" @click="$emit('prev-chapter')"
              :disabled="!hasPrevChapter">
        <svg class="navBtn transform rotate-180"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Previous Chapter</title>
          <path d="M1 5l9 5-9 5V5zm9 0l9 5-9 5V5z"/>
        </svg>
      </button>
      <button class="disabled:text-gray-800" aria-label="Previous Comic" @click="$emit('prev-comic')"
              :disabled="!hasPrevComic">
        <svg class="navBtn transform rotate-180"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Previous Comic</title>
          <path d="M4 4l12 6-12 6z"/>
        </svg>
      </button>
    </div>

    <div>
      <button class="disabled:text-gray-800" aria-label="Next Comic" @click="$emit('next-comic')"
              :disabled="!hasNextComic">
        <svg class="navBtn" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Next Comic</title>
          <path d="M4 4l12 6-12 6z"/>
        </svg>
      </button>
      <button class="disabled:text-gray-800" aria-label="Next Chapter" @click="$emit('next-chapter')"
              :disabled="!hasNextChapter">
        <svg class="navBtn" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Next Chapter</title>
          <path d="M1 5l9 5-9 5V5zm9 0l9 5-9 5V5z"/>
        </svg>
      </button>
      <button class="disabled:text-gray-800" aria-label="Latest Comic" @click="$emit('latest-comic')"
              :disabled="!hasNextComic">
        <svg class="navBtn" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Latest Comic</title>
          <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ComicNav",
  props: [
    "hasNextComic",
    "hasNextChapter",
    "hasPrevComic",
    "hasPrevChapter"
  ]
};
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
