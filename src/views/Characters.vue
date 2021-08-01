<template>
  <section class="mt-2 pt-8 text-gray-400 w-full border-t border-gray-700">
    <div class="flex">
      <div class="flex flex-col justify-between items-center px-4 w-full">
        <div class="">
          <h1 class="text-primary text-5xl font-bold">Kiva</h1>
        </div>
        <div class="w-3/4">
          <img alt="Character Image" :src="require('@/assets/characters/' + character.fullImg)">
        </div>

        <div class="flex justify-center w-full">
          <div class="w-1/3 self-end">
            <div class="flex flex-col w-full">
              <div>
                <img alt="Character Portrait" :src="require('@/assets/characters/' + portrait.portraitImg)">
              </div>
              <div class="flex justify-between mx-auto -mt-8 w-full sm:px-4">
                <div>
                  <button @click="prevPortrait"
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
                  <button @click="nextPortrait"
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
            <div class="prose p-4 overflow-y-auto text-center h-full w-full" v-html="portrait.text">
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "Characters",
  data() {
    return {
      selectedCharIdx: 0,
      selectedPortraitIdx: 0,
      characterList: [
        {
          fullImg: 'kiva_full.png',
          talkingHeads: [
            {
              portraitImg: 'kiva_portrait.png',
              text: 'I am Kiva\'s text'
            },
            {
              portraitImg: 'max_portrait.png',
              text: '<p>EEEEEEEEEE!!! That’s Kiva! Oh, man, you guys, he’s SO COOL. And he’s sweet and kind and soft and\n' +
                  '                handsome\n' +
                  '                and his spots are SO BEAUTIFUL and he’s just the greatest guy EVER.</p>\n' +
                  '              <p>Did I ever tell you guys how I met him? OMG, so get this okay? So I’m walking along, and… um… cuz some\n' +
                  '                stuff just happened, and I’m feeling kinda down, right? And I see him digging through a pile of stuff,\n' +
                  '                and\n' +
                  '                my eyes just fall on his back, cuz like… I’ve never seen anyone with so many spots before! Like… okay,\n' +
                  '                he\n' +
                  '                had his shirt off… And I’m sitting there staring, and it was probably kinda rude, but he finally notices\n' +
                  '                me\n' +
                  '                and he whirls around and steps up all threatening like, right? And then he’s like, “WHAT ARE YOU STARING\n' +
                  '                AT?” in his big scary Kiva voice, you know? So, I kinda just break down and start crying, because at\n' +
                  '                that\n' +
                  '                point I’m terrified he’s gonna hurt me, cuz I didn’t know him, and cuz that’s like… anyway... So instead\n' +
                  '                he\n' +
                  '                feels really bad about it, and he just sits down with me and we start talking and I just prolly go on\n' +
                  '                and\n' +
                  '                on\n' +
                  '                for hours, spilling my whole life’s story to him and he just kinda… listens. And see… nobody’s ever done\n' +
                  '                that before… or since, actually… And when I’m done crying and talking I look at him, and I just get lost\n' +
                  '                into his big beautiful eyes, and I just kinda… lean in to kiss him. But then he pushes me over, cuz\n' +
                  '                like…\n' +
                  '                yeah, it was a bit much, I’ll admit. I don’t normally… DO stuff like that… but it was just… I dunno!\n' +
                  '                Anyway,\n' +
                  '                after that, he walks with me back to the Twirl, cuz like… Kiva was MAD after all that stuff I told him,\n' +
                  '                and\n' +
                  '                he was about to punch someone I think… but by then Gilly’s calmed down and he’s being really nice to me\n' +
                  '                all\n' +
                  '                of a sudden? And he kinda pulled me off to the side and Kiva didn’t want me to go with him, but I did\n' +
                  '                cuz\n' +
                  '                like… he had all my stuff… and like… it sounded like a pretty good deal the way he was going on about\n' +
                  '                it…\n' +
                  '                so… that’s… a whole thing now… But anyway, Kiva and I kept kinda meeting up every once in awhile, just\n' +
                  '                for\n' +
                  '                like, going out for food and drinks and stuff… Before we knew it, we were hanging out almost every day!\n' +
                  '                Usually for drinks… and well, I don’t drink, but Kiva does, he drinks a LOT. Wait… I shouldn’t really…\n' +
                  '                um...</p>\n' +
                  '              <p>Anyway, Kiva is awesome, I’ve seen him fight a couple of times, he’s AMAZING! He kicks the tails of\n' +
                  '                anyone\n' +
                  '                who steps up… if… er… when he’s sober. And I just… I dunno… I feel really safe when he’s around. Not\n' +
                  '                like…\n' +
                  '                um… well, he makes me feel safe. That’s all.</p>'
            }
          ]
        }
      ]
    }
  },
  computed: {
    character() {
      return this.characterList[this.selectedCharIdx];
    },
    portrait() {
      return this.character.talkingHeads[this.selectedPortraitIdx];
    }
  },
  methods: {
    nextPortrait() {
      this.selectedPortraitIdx = ++this.selectedPortraitIdx % this.character.talkingHeads.length;
    },
    prevPortrait() {
      this.selectedPortraitIdx = Math.abs(--this.selectedPortraitIdx % this.character.talkingHeads.length);
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
</style>