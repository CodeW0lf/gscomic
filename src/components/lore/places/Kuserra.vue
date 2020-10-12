<template>
  <section class="my-8 md:mt-0 md:mb-4 mx-8">
    <article class="prose max-w-none">
      <h2>Kuserra</h2>
      <p>
        Kuserra is a sprawling, ruined metropolis nestled at the base of a lone
        mountain and surrounded by the aptly-named Deadlands. While the name
        “Kuserra” is used in regards to the entire ruined city, only about a
        fifth of the region can be considered part of the settlement. The rest
        is an untamed jungle of labyrinthine wreckage, inhabited by marauding
        gangs, fanatic cults, and violent tribes of ferals.
      </p>
      <p>
        The city is home to many creatures, mostly carnivores. Kuserra has
        abundant shelter, a surplus of relatively clean water and plenty of
        available food if one can stomach lots of juicy rats, crunchy insects,
        and the occasional slimy aquatic creature. The bulk of Kuserra’s
        population is likely descended from those who at some point became
        stranded in the Deadlands and migrated to the nearest available shelter.
        Now, Kuserra has amassed a population so large that competition for its
        limited food resources is becoming an increasingly serious problem.
      </p>
      <p>
        Kuserra’s primary industry is salvage, as scavengers commonly pull all
        kinds of treasure out of the ruin. A few times a month, a lucky trade
        caravan might successfully make the trek across the Deadlands to bring
        valuable resources to the settlement. Traders come to Kuserra from
        neighboring settlements to buy water, scrap components, slaves or
        building materials, and in return, they bring valuable canned food,
        watts, technology and textiles.
      </p>
      <h2 class="text-center">Locations Within Kuserra</h2>
    </article>
    <div
      class="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3 mt-6"
    >
      <div>
        <button>
          <router-link to="unknown">
            <img
              class="h-18 rounded border border-primary hover:filter-grayscale hover:border-white"
              src="@/assets/lore/lore-locations-citadel.png"
              alt="Kuserra Location"
            />
          </router-link>
        </button>
      </div>
      <div>
        <button>
          <router-link to="unknown">
            <img
              class="h-18 rounded border border-primary hover:filter-grayscale hover:border-white"
              src="@/assets/lore/lore-locations-underground.png"
              alt="Kuserra Location"
            />
          </router-link>
        </button>
      </div>
      <div>
        <button>
          <router-link to="unknown">
            <img
              class="h-18 rounded border border-primary hover:filter-grayscale hover:border-white"
              src="@/assets/lore/lore-locations-downtown.png"
              alt="Kuserra Location"
            />
          </router-link>
        </button>
      </div>
    </div>
    <div class="text-center mt-8">
      <BackButton path="/lore/places">Back to Places</BackButton>
    </div>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton'
export default {
  name: 'LoreLocations',
  components: { BackButton },
}
</script>

<style scoped></style>
