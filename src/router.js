import Vue from 'vue'
import Router from 'vue-router'

const Comic = () => import('./views/Comic.vue')
const RileyComic = () => import('./views/RileyComic.vue')
const Unknown = () => import('./components/lore/places/Unknown.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/comic/:id',
      component: Comic,
      props: true,
    },
    {
      path: '/rileycomic/:id',
      component: RileyComic,
      props: true,
    },
    {
      path: '/links',
      component: () => import('./views/Links.vue'),
    },
    {
      path: '/characters',
      component: () => import('./views/Characters.vue'),
    },
    {
      path: '/sketches',
      component: () => import('./views/Sketches.vue'),
    },
    {
      path: '/archive',
      component: () => import('./views/Archive.vue'),
    },
    {
      path: '/',
      component: Comic,
    },
    {
      path: '/rileycomic',
      component: RileyComic
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
