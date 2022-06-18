import Vue from 'vue'
import Router from 'vue-router'

const Comic = () => import('./views/Comic')
const RileyComic = () => import('./views/RileyComic')
const Unknown = () =>
    import(/* webpackChunkName: "lore" */ './components/lore/places/Unknown')

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
      path: '/lore',
      component: () => import(/* webpackChunkName: "lore" */ './views/Lore'),
      children: [
        {
          path: 'places',
          component: () =>
              import(
                  /* webpackChunkName: "lore" */ './components/lore/LorePlaces'
                  ),
        },
        {
          path: 'places/kuserra',
          component: () =>
              import(
                  /* webpackChunkName: "lore" */ './components/lore/places/Kuserra'
                  ),
          children: [
            {
              path: 'downtown',
              component: () =>
                  import(
                      /* webpackChunkName: "lore" */ './components/lore/places/kuserra/Downtown'
                      ),
            },
            {
              path: 'citadel',
              component: () =>
                  import(
                      /* webpackChunkName: "lore" */ './components/lore/places/kuserra/Citadel'
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
                  /* webpackChunkName: "culture" */ './components/lore/LoreCulture'
                  ),
        },
        {
          path: 'culture/gods',
          component: () =>
              import(
                  /* webpackChunkName: "culture" */ './components/lore/culture/Gods'
                  ),
        },
        {
          path: '',
          component: () =>
              import(/* webpackChunkName: "lore" */ './components/lore/LoreHome'),
        },
      ],
    },
    {
      path: '/characters',
      component: () => import(/* webpackChunkName: "characters" */ './views/Characters'),
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
      path: '/rileycomic',
      component: RileyComic
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
