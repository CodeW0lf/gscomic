import Vue from 'vue'
import Router from 'vue-router'
const Comic = () => import('./views/Comic')
const Lore = () => import('./views/Lore')
const Sketches = () => import('./views/Sketches')
const LorePlaces = () => import('./components/lore/LorePlaces')
const LoreHome = () => import('./components/lore/LoreHome')
const Kuserra = () => import('./components/lore/places/Kuserra')

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
      path: '/lore',
      component: Lore,
      children: [
        {
          path: 'places',
          component: LorePlaces,
        },
        {
          path: 'places/kuserra',
          component: Kuserra,
        },
        {
          path: '',
          component: LoreHome,
        },
      ],
    },
    {
      path: '/sketches',
      component: Sketches,
    },
    {
      path: '/',
      component: Comic,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
