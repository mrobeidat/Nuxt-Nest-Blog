<template>
  <div>
    <Carousel class="w-3/5 m-auto" :items-to-show="1">
      <Slide v-for="file in files" :key="file.id">
        <img class="object-contain rounded-3xl" :src="getStrapiMedia(file.attributes.url) || ''" />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

defineProps<{
  files: { id: number, attributes: { url: string } }[];
}>()
</script>