<template>
  <NuxtLayout>
    <NuxtPage :global="global" />
  </NuxtLayout>
</template>

<script setup>
const { find } = useStrapi();
const globalResponse = await find('global', {
  populate: 'deep',
});
let global = globalResponse.data.attributes;

useHead({
  title: global?.defaultSeo.metaTitle,
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/png', href: getStrapiMedia(global?.favicon?.data?.attributes?.url) },
  ],
  meta: [
    { name: 'description', content: global?.defaultSeo?.metaDescription },
    { name: 'og:title', content: global?.defaultSeo?.metaTitle },
    { name: 'og:description', content: global?.defaultSeo?.metaDescription },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'en_US' },
    { name: 'og:image', content: getStrapiMedia(global?.defaultSeo?.shareImage?.data.attributes.url) },
  ],
})
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>