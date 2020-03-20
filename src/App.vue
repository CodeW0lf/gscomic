<template>
  <div id="app">
    <header class="hero">
      <div class="hero-body is-marginless is-paddingless has-text-centered">
        <img class="image is-fullwidth" src="./assets/title_banner.png" alt="God Slayers Comic">
        <a href="#" v-scroll-to="'#top'" class="test is-size-1"><i class="fas fa-chevron-down animated pulse infinite slower"></i></a>
      </div>
    </header>
    <div class="container has-text-centered" id="top">
      <router-view/>
    </div>
    <footer class="footer has-text-grey">
      <div class="container has-text-centered">
        <p><b>Posting schedule resumed! <a href="https://www.patreon.com/posts/32457373">Read more here</a></b>.<br/>
          Like the comic? Support us on
          <a href="https://www.patreon.com/elitetrick" class="has-text-patreon" target="_blank"><i class="fab fa-patreon"></i> Patreon</a></p>
        <p>Copyright &copy; 2018-2019 Steven Lloyd. All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
  .test {
    position: relative;
    bottom: 50px;
    color: #fff;
    opacity: 0.3;
    transition: opacity 0.5s;

    &:hover {
      opacity: 1.0;
    }
  }
</style>
