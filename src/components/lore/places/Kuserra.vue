<template>
  <section class="mb-2 mt-0 md:my-8 mx-8">
    <article class="prose max-w-none">
      <h2>Kuserra</h2>
      <p>
        Kuserra is a sprawling, ruined metropolis nestled at the base of a lone
        mountain and surrounded by the aptly-named Deadlands. While the name
        “Kuserra” is used in regards to the entire ruined city, only about a
        fifth of it can be considered part of the settlement. The rest is an
        untamed jungle of labyrinthine urban wreckage, inhabited by marauding
        gangs, fanatic cults, and violent tribes of ferals.
      </p>
      <p>
        The city is home to many creatures, mostly carnivores. Kuserra has
        abundant shelter, a surplus of relatively clean water and plenty of
        available food if one can stomach lots of juicy rats, crunchy insects,
        and the occasional slimy aquatic creature. The bulk of Kuserra’s
        population is likely descended from those who, at some point, became
        stranded in the Deadlands and found their way to the nearest available
        shelter. Now, Kuserra has amassed a population so large that competition
        for its limited resources is becoming an increasingly serious problem.
      </p>
      <p>
        Kuserra’s primary industry is salvage, as scavengers commonly pull all
        kinds of treasure out of the ruins. A few times a month, trade caravans
        make the trek across the Deadlands to bring valuable resources to the
        settlement. Traders come to Kuserra from neighboring settlements to buy
        water, scrap components, slaves, or building materials, and in return,
        they bring valuable canned food, watts, technology and textiles.
      </p>
      <h2 class="text-center">Locations Within Kuserra</h2>
    </article>
    <div
      class="
        grid grid-cols-1
        justify-items-center justify-center
        gap-4
        mt-6
        md:grid-cols-3
      "
    >
      <div>
        <section-button
          path="/lore/places/kuserra/citadel"
          style="max-width: 300px"
          :img="require('@/assets/lore/lore-locations-citadel.png')"
          alt="Citadel"
          small
        />
      </div>
      <div>
        <section-button
          path="/lore/places/kuserra/unknown"
          style="max-width: 300px"
          :img="require('@/assets/lore/lore-locations-underground.png')"
          alt="Underground"
          small
          disabled
        />
      </div>
      <div>
        <section-button
          path="/lore/places/kuserra/downtown"
          style="max-width: 300px"
          :img="require('@/assets/lore/lore-locations-downtown.png')"
          alt="Downtown"
          small
        />
      </div>
    </div>
    <router-view></router-view>
    <div class="text-center mt-8">
      <BackButton path="/lore/places">Back to Places</BackButton>
    </div>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton'
import SectionButton from '@/components/lore/SectionButton'
export default {
  name: 'LoreLocations',
  components: { SectionButton, BackButton },
}
</script>

<style scoped></style>
