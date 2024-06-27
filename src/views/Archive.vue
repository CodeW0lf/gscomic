<template>
  <section class="relative text-white w-full">
    <div v-for="chapterIdx in chapterMap.keys()" :key="chapterIdx" class="flex flex-col gap-2 my-4 mx-2">
      <div class="text-2xl mt-4">Chapter {{ chapterIdx }}</div>
      <transition-group tag="div" name="fade"
                        class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        <div v-for="comicId in chapterMap.get(chapterIdx)" :key="comicId">
          <router-link :to="`${comicPath}/${comicId}`">
            <!-- TODO(Kevin): We need thumbnails for the comics -->
            <img :src="'img/comics/' + comicList[comicId]" alt="Comic Image"/>
          </router-link>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Archive',
  computed: {
    ...mapState(['comicList', 'chapters', 'comicPath']),
  },
  data() {
    return {
      chapterMap: new Map(),
    }
  },
  methods: {
    ...mapActions(['loadComics']),
    createChapters() {
      let chapterIndex = 1
      let nextChapterEndId = this.chapters[chapterIndex]
      for (const comicId in this.comicList) {
        if (!Object.prototype.hasOwnProperty.call(this.comicList, comicId)) {
          continue
        }
        if (!this.chapterMap.has(chapterIndex)) {
          this.chapterMap.set(chapterIndex, [])
        }
        this.chapterMap.get(chapterIndex).push(comicId)
        if (+comicId === +nextChapterEndId) {
          chapterIndex++
          nextChapterEndId = this.chapters[chapterIndex]
        }
      }
    },
  },
  mounted() {
    this.loadComics().then(() => this.createChapters()).finally(() => this.$forceUpdate())
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>