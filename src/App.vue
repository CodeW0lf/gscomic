<template>
  <div id="app">
    <header>
      <div class="container has-text-centered">
        <figure class="image">
          <img src="./assets/title_banner.jpg">
        </figure>
      </div>
    </header>
    <div class="container has-text-centered">
      <router-view/>
    </div>
    <footer class="footer has-text-grey">
      <div class="container has-text-centered">
        <p><b>Updates Wednesdays</b>. Like the comic? Support us on
          <a href="https://www.patreon.com/elitetrick" class="has-text-patreon" target="_blank"><i class="fab fa-patreon"></i> Patreon</a></p>
        <p>Copyright &copy; 2018 Steven Lloyd. All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
</style>
