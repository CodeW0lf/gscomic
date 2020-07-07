import Vue from 'vue'
import Vuex from 'vuex'
import ComicsService from '@/services/ComicsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comicId: 1,
    latestComicId: 1,
    comicList: {},
    chapters: [],
  },
  getters: {
    getComicFileName(state) {
      return state.comicList[state.comicId]
    },
    hasNextComic(state) {
      return state.comicId + 1 in state.comicList
    },
    hasPrevComic(state) {
      return state.comicId - 1 in state.comicList
    },
    hasNextChapter(state) {
      for (let val of state.chapters) {
        if (state.comicId < val) {
          return true
        }
      }
      return false
    },
    hasPrevChapter(state) {
      for (let val of state.chapters) {
        if (state.comicId > val + 1) {
          return true
        }
      }
      return false
    },
  },
  mutations: {
    SET_CURRENT_COMIC(state, id) {
      state.comicId = id
    },
    SET_LATEST_COMIC(state, id) {
      state.latestComicId = id
    },
    SET_COMIC_LIST(state, comicList) {
      state.comicList = comicList
    },
    SET_CHAPTER_LIST(state, chapterList) {
      state.chapters = chapterList
    },
  },
  actions: {
    async loadComics({ commit }) {
      let res = await ComicsService.getComics()
      commit('SET_COMIC_LIST', res.data.comics)
      commit('SET_CHAPTER_LIST', res.data.chapters)
      commit('SET_CURRENT_COMIC', res.data.latest)
      commit('SET_LATEST_COMIC', res.data.latest)
    },
    updateComicId({ commit, state }, id) {
      let cleanId = parseInt(id, 10) || state.latestComicId
      if (isNaN(cleanId) || cleanId <= 0 || !(cleanId in state.comicList)) {
        cleanId = state.latestComicId
      }
      commit('SET_CURRENT_COMIC', cleanId)
    },
  },
  modules: {},
})
