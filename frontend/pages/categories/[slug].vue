<template>
  <div>
    <Heading :title="category.name || ''" />
    <main>
      <Articles :articles="articles || []" />
    </main>
  </div>
</template>

<script setup lang="ts">
// import type { Strapi4RequestParams, Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types';
// import type {ApiArticleArticle} from '../../../backend/types/generated/contentTypes'
const props = defineProps({
  global: Object as () => Record<string, any>,
});


// type Find = <F = unknown>(contentType: string, params?: Strapi4RequestParams | undefined) => Promise<Strapi4ResponseMany<F>>
// const { find }:{find:Find} = useStrapi();
const { find } = useStrapi();
const route = useRoute();

const matchingCategoriesResponse = await find('categories', { filters: { slug: route.params.slug }, populate: 'deep' });
const matchingCategories = matchingCategoriesResponse.data;
const category = (matchingCategories[0]?.attributes ?? {}) as { name?: string; description?: string; slug?: string };
const categorySlug = category.slug ?? '';
const articlesResponse = await find("articles", { filters: { "category": { slug: categorySlug } }, populate: 'deep' });
const articles = articlesResponse.data ?? [];

// const matchingCategoriesResponse = await find('categories', { filters: { slug: route.params.slug }, populate: 'deep' });
// const matchingCategories = matchingCategoriesResponse.data;
// const category = (matchingCategories[0]?.attributes) 
// const categorySlug = category.slug ?? '';
// const articlesResponse = await find("articles", { filters: { "category": { slug: categorySlug } }, populate: 'deep' });
// const articles = articlesResponse.data ?? [];

useHead({
  title: `${category.name ?? ''} | ${props.global?.siteName}`,
  meta: [
    { name: 'description', content: category.description ?? '' },
    { name: 'og:title', content: category.name ?? '' },
    { name: 'og:description', content: category.description ?? '' },
  ],
});
</script>
