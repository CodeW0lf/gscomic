import Vue from 'vue'
import Router from 'vue-router'

const Comic = () => import('./views/Comic')

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
      component: () => import('./views/Lore'),
      children: [
        {
          path: 'places',
          component: () => import('./components/lore/LorePlaces'),
        },
        {
          path: 'places/kuserra',
          component: () => import('./components/lore/places/Kuserra'),
        },
        {
          path: 'places/unknown',
          component: () => import('./components/lore/places/Unknown'),
        },
        {
          path: 'culture',
          component: () => import('./components/lore/LoreCulture'),
        },
        {
          path: 'culture/gods',
          component: () => import('./components/lore/culture/Gods'),
        },
        {
          path: '',
          component: () => import('./components/lore/LoreHome'),
        },
      ],
    },
    {
      path: '/sketches',
      component: () => import('./views/Sketches'),
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
