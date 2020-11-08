<template>
  <main
    class="flex justify-center items-center bg-gray-300 w-full"
    :style="{ height: '95vh' }"
  >
    <section
      class="bg-gray-100 sm:w-full md:w-full lg:w-2/4 xl:w-2/4 p-10 text-6xl rounded antialiased"
    >
      <p>Loading {{ description }}</p>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// Define the props by using Vue's canonical way.
const LoadingProps = Vue.extend({
  props: {
    name: String,
  },
});

@Component
export default class Loading extends LoadingProps {}
</script>
