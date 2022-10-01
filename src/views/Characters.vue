<template>
  <section class="mt-2 pt-8 text-gray-400 w-full">
    <div class="flex">
      <div class="flex flex-col justify-between items-center px-4 w-full">
        <div class="">
          <h1 class="text-primary text-5xl font-bold">{{ character.name }}</h1>
        </div>
        <div class="w-3/4 relative pt-[100%]">
          <div class="flex flex-col w-full h-full absolute inset-0">
            <div class="overflow-hidden flex-1">
              <transition mode="out-in" :enter-active-class="'animated fade-duration ' + enterActive"
                          :leave-active-class="'animated fade-duration ' + leaveActive"
                          v-on:before-leave="charBeforeLeave" v-on:after-enter="charAfterEnter">
                <img alt="Character Image" :key="character.fullImg" :src="getImageUrl(character.fullImg)">
              </transition>
            </div>
            <div class="flex justify-between mx-auto -mt-20 w-full py-8">
              <div>
                <button @click="prevCharacter" title="See Other Characters"
                        class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700 text-primary">
                  <svg aria-hidden="true" focusable="false"
                       class="fillCurrent w-8 h-8 sm:w-10 sm:h-10 transform rotate-180" role="img"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512">
                    <!--
                    Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
                    License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
                    -->
                    <path fill="currentColor"
                          d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </button>
              </div>
              <div>
                <button @click="nextCharacter" title="See Other Characters"
                        class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700 text-primary">
                  <svg aria-hidden="true" focusable="false"
                       class="fillCurrent w-8 h-8 sm:w-10 sm:h-10" role="img"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512">
                    <!--
                    Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
                    License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
                    -->
                    <path fill="currentColor"
                          d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center w-full">
          <div class="w-1/3 self-end overflow-hidden">
            <div class="flex flex-col w-full animated fade-duration fadeIn" v-show="portraitsVisible">
              <div>
                <transition mode="out-in" :enter-active-class="'animated fade-duration ' + enterActive"
                            :leave-active-class="'animated fade-duration ' + leaveActive">
                  <img alt="Character Portrait" :key="portrait.portraitImg" class="z-0"
                       :src="getImageUrl(portrait.portraitImg)">
                </transition>
              </div>
              <div class="flex justify-between mx-auto -mt-8 w-full sm:px-4 z-10">
                <div>
                  <button @click="prevPortrait" title="See what others have to say!"
                          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700">
                    <svg aria-hidden="true" focusable="false"
                         class="fillCurrent w-8 h-8 sm:w-10 sm:h-10 text-primary transform rotate-180" role="img"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                      <!--
                      Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
                      License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
                      -->
                      <path fill="currentColor"
                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <button @click="nextPortrait" title="See what others have to say!"
                          class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded disabled:text-gray-700">
                    <svg aria-hidden="true" focusable="false"
                         class="fillCurrent w-8 h-8 sm:w-10 sm:h-10 text-primary" role="img"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                      <!--
                      Font Awesome Free 5.15.0 by @fontawesome - https://fontawesome.com
                      License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
                      -->
                      <path fill="currentColor"
                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="triangle-border left mb-4 sm:mb-14 p-2 h-96 w-2/3">
            <transition mode="out-in" enter-active-class="animated fadeIn fade-duration"
                        leave-active-class="animated fadeOut fade-duration">
              <div class="prose p-4 overflow-y-auto text-center h-full w-full"
                   v-html="portrait.text" :key="portrait.text">
              </div>
            </transition>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import characterList from '/src/characters-data/characterList.json'

export default {
  name: 'Characters',
  data() {
    return {
      selectedCharIdx: 0,
      selectedPortraitIdx: 0,
      portraitsVisible: true,
      characterList: characterList.characters,
      enterActive: 'slideInRight',
      leaveActive: 'slideOutLeft',
    }
  },
  computed: {
    character() {
      return this.characterList[this.selectedCharIdx]
    },
    portrait() {
      return this.character.talkingHeads[this.selectedPortraitIdx]
    }
  },
  methods: {
    nextPortrait() {
      this.enterActive = 'slideInRight'
      this.leaveActive = 'slideOutLeft'
      this.selectedPortraitIdx = ++this.selectedPortraitIdx % this.character.talkingHeads.length
    },
    prevPortrait() {
      this.enterActive = 'slideInLeft'
      this.leaveActive = 'slideOutRight'
      const len = this.character.talkingHeads.length
      this.selectedPortraitIdx = (--this.selectedPortraitIdx + len) % len
    },
    nextCharacter() {
      this.selectedPortraitIdx = 0
      this.enterActive = 'slideInRight'
      this.leaveActive = 'slideOutLeft'
      this.selectedCharIdx = ++this.selectedCharIdx % this.characterList.length
    },
    prevCharacter() {
      this.selectedPortraitIdx = 0;
      this.enterActive = 'slideInLeft'
      this.leaveActive = 'slideOutRight'
      const len = this.characterList.length
      this.selectedCharIdx = (--this.selectedCharIdx + len) % len
    },
    charBeforeLeave() {
      this.portraitsVisible = false
    },
    charAfterEnter() {
      this.portraitsVisible = true
    },
    getImageUrl(name) {
      return new URL(`/src/assets/characters/${name}`, import.meta.url).href
    }
  }
}
</script>

<style scoped>
.triangle-border {
  position: relative;
  /*padding: 15px;*/
  /*margin: 1em 0 3em;*/
  border: 3px solid #3B9C7D;
  background: #000;
  /* css3 */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}

/* Variant : for left positioned triangle
------------------------------------------ */

.triangle-border.left {
  /*margin-left: 30px;*/
}

.triangle-border:before {
  content: "";
  position: absolute;
  bottom: -20px; /* value = - border-top-width - border-bottom-width */
  left: 40px; /* controls horizontal position */
  border-width: 20px 20px 0;
  border-style: solid;
  border-color: #3B9C7D transparent;
  /* reduce the damage in FF3.0 */
  display: block;
  width: 0;
}

/* creates the smaller  triangle */
.triangle-border:after {
  content: "";
  position: absolute;
  bottom: -13px; /* value = - border-top-width - border-bottom-width */
  left: 47px; /* value = (:before left) + (:before border-left) - (:after border-left) */
  border-width: 13px 13px 0;
  border-style: solid;
  border-color: #000000 transparent;
  /* reduce the damage in FF3.0 */
  display: block;
  width: 0;
}

/* Variant : left
------------------------------------------ */

/* creates the larger triangle */
.triangle-border.left:before {
  top: auto; /* controls vertical position */
  bottom: 40px;
  left: -30px; /* value = - border-left-width - border-right-width */
  border-width: 15px 30px 15px 0;
  border-color: transparent #3B9C7D;
}

/* creates the smaller  triangle */
.triangle-border.left:after {
  top: auto; /* value = (:before top) + (:before border-top) - (:after border-top) */
  bottom: 46px;
  left: -21px; /* value = - border-left-width - border-right-width */
  border-width: 9px 21px 9px 0;
  border-color: transparent #000;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1f2937;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #3B9C7D;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #57e7b9;
}

.fade-duration {
  animation-duration: 250ms;
}
</style>