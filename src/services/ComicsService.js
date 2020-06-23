import Api from '@/services/Api'

export default {
  getComics() {
    return Api().get("get-comics.php");
  },
  getSketches() {
    return Api().get("get-sketches.php");
  }
}