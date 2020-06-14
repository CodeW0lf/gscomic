<template>
  <section class="flex justify-between items-center mx-4 text-primary">
    <div>
      <a @click="$emit('first-comic')">
        <svg class="navBtn transform rotate-180" :class="{'text-gray-800': !hasPrevComic}"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>First Comic</title>
          <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/>
        </svg>
      </a>
      <a @click="$emit('prev-chapter')">
        <svg class="navBtn transform rotate-180" :class="{'text-gray-800': !hasPrevChapter}"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Previous Chapter</title>
          <path d="M1 5l9 5-9 5V5zm9 0l9 5-9 5V5z"/>
        </svg>
      </a>
      <a @click="$emit('prev-comic')">
        <svg class="navBtn transform rotate-180" :class="{'text-gray-800': !hasPrevComic}"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Previous Comic</title>
          <path d="M4 4l12 6-12 6z"/>
        </svg>
      </a>
    </div>

    <div>
      <a @click="$emit('next-comic')">
        <svg class="navBtn" :class="{'text-gray-800': !hasNextComic}" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Next Comic</title>
          <path d="M4 4l12 6-12 6z"/>
        </svg>
      </a>
      <a @click="$emit('next-chapter')">
        <svg class="navBtn" :class="{'text-gray-800': !hasNextChapter}" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Next Chapter</title>
          <path d="M1 5l9 5-9 5V5zm9 0l9 5-9 5V5z"/>
        </svg>
      </a>
      <a @click="$emit('latest-comic')">
        <svg class="navBtn" :class="{'text-gray-800': !hasNextComic}" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20">
          <title>Latest Comic</title>
          <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/>
        </svg>
      </a>
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
  @apply fill-current cursor-pointer w-10 inline-block mx-1;
}

@screen sm {
  .navBtn {
    @apply w-12;
  }
}
</style>
