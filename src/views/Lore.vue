<template>
  <section class="lore-section">
    <div id="lore-top" class="level is-mobile lore-level">
      <div class="level-left"></div>
      <SiteNav></SiteNav>
    </div>
    Coming Soon.
<!--    <div class="tile is-ancestor">-->
<!--      <div class="tile is-vertical is-parent is-3 is-3-mobile is-3-tablet">-->
<!--        <div class="tile is-child" @mouseover="showBubble = selected === 2" @mouseleave="showBubble = false">-->
<!--          <div style="position: relative">-->
<!--            <figure @click="characterBio(1)" class="image is-4by3" :class="{highlight : selected === 1}">-->
<!--              <img src="/comics/comic0.jpg">-->
<!--            </figure>-->
<!--            <span v-if="showBubble" class="speech-bubble">I hate that guy</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="tile is-child" @mouseover="showBubble2 = selected === 1" @mouseleave="showBubble2 = false">-->
<!--          <div style="position: relative">-->
<!--            <figure @click="characterBio(2)" class="image is-4by3" :class="{highlight : selected === 2}">-->
<!--              <img src="/comics/comic1.jpg">-->
<!--            </figure>-->
<!--            <span v-if="showBubble2" class="speech-bubble">I have no opinion</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="tile is-parent is-9">-->
<!--        <div class="tile is-child">{{curContent}}</div>-->
<!--      </div>-->
<!--    </div>-->
    <SocialLinks></SocialLinks>
  </section>
</template>

<script>
  import SiteNav from "@/components/SiteNav";
  import SocialLinks from "@/components/SocialLinks";
  export default {
    name: "Lore",
    data() {
      return {
        showBubble: false,
        showBubble2: false,
        curContent: 'Choose a Character!',
        selected: 0
      }
    },
    components: {
      SocialLinks,
      SiteNav
    },
    methods: {
      characterBio(index) {
        switch (index) {
          case 1:
            this.curContent = 'Description one!Description one!Description one!Description one!Description one!Description one!Description one!Description one!';
            break;
          case 2:
            this.curContent = 'Another Description!Another Description!Another Description!Another Description!Another Description!Another Description!Another Description!Another Description!';
            break;
        }
        this.selected = index;
        this.showBubble = false;
        this.showBubble2 = false;
      }
    }
  }
</script>

<style scoped>
  .lore-section {
    margin: 20px auto;
    max-width: 900px;
  }
  .lore-level {
    height: 48px;
  }
  .level {
    margin: 0 10px 0 15px !important;
  }
  .speech-bubble {
    position: absolute;
    padding-top: 10px;
    color: #000;
    background: #fff;
    border-radius: .4em;
    border: 5px solid #000;
    width: 150%;
    height: 6em;
    left: 100%;
    top: 10%;
  }
  .speech-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    width: 0;
    height: 0;
    border: 39px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    border-bottom: 0;
    margin-top: -5px;
    margin-left: -39px;
  }
  figure.highlight {
    border-radius: 5px;
    box-shadow: 0 0 20px 3px white;
  }
</style>