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
      path: '/lore',
      component: () => import('./views/Lore.vue'),
      children: [
        {
          path: 'places',
          component: () =>
            import(
              './components/lore/LorePlaces.vue'
            ),
        },
        {
          path: 'places/kuserra',
          component: () =>
            import(
              './components/lore/places/Kuserra.vue'
            ),
          children: [
            {
              path: 'downtown',
              component: () =>
                import(
                  './components/lore/places/kuserra/Downtown.vue'
                ),
            },
            {
              path: 'citadel',
              component: () =>
                import(
                  './components/lore/places/kuserra/Citadel.vue'
                ),
            },
            {
              path: 'unknown',
              component: Unknown,
            },
          ],
        },
        {
          path: 'places/unknown',
          component: Unknown,
        },
        {
          path: 'culture',
          component: () =>
            import(
              './components/lore/LoreCulture.vue'
            ),
        },
        {
          path: 'culture/gods',
          component: () =>
            import(
              './components/lore/culture/Gods.vue'
            ),
        },
        {
          path: '',
          component: () =>
            import('./components/lore/LoreHome.vue'),
        },
      ],
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
