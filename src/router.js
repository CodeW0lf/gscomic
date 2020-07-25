import Vue from 'vue'
import Router from 'vue-router'
const Comic = () => import('./views/Comic')
const Lore = () => import('./views/Lore')
const Sketches = () => import('./views/Sketches')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/comic/:id',
      name: 'comic',
      component: Comic,
      props: true,
    },
    {
      path: '/lore',
      name: 'lore',
      component: Lore,
    },
    {
      path: '/sketches',
      name: 'sketches',
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
