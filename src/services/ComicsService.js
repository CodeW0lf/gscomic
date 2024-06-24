import Api from '@/services/Api'

export default {
  getComics() {
    return Api().get('/get-comics.php')
  },
  getRileyComics(version) {
    return Api().get('/get-riley-comics.php?version=' + version)
  },
  getSketches() {
    return Api().get('/get-sketches.php')
  },
  getBadges() {
    return Api().get('/get-badges.php')
  }
}
