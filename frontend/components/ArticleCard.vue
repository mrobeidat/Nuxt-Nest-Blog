<template>
  <NuxtLink :key="article.id" :to="{ name: 'articles-slug', params: { slug: ArticleAttributes.slug } }"
    class="overflow-hidden rounded-lg m-10 backdrop-blur-3xl shadow-lg transition-shadow hover:shadow-2xl">
    <img class="h-64 w-full object-cover" :src="coverUrl" />
    <div class="px-4 py-4">
      <p v-if="categoryName" class="font-bold text-neutral-300 uppercase">
        {{ categoryName }}
      </p>
      <div>
        <h2 id="title" class="text-xl font-bold text-neutral-300">{{ articleTitle }}</h2>
        <p class="line-clamp-2 mt-2 text-neutral-300">
          {{ articleDescription }}
        </p>
      </div>
      <div class="flex mt-2">
        <img class="object-cover w-10 h-10" :src="authorAvatarUrl" style="border-radius: 50%" width="40" height="40"
          :alt="articleTitle" />
        <span class="px-2 self-center text-neutral-300">{{ authorName }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

interface Article {
  id: number;
  attributes: {
    slug: string;
    cover: { data: { attributes: { url: string } } };
    category: { data: { attributes: { name: string } } };
    title: string;
    description: string;
    author: { data: { attributes: { avatar: { data: { attributes: { url: string } } }, name: string } } };
  }
}
const { article } = defineProps<{
  article: Article;
}>();

const ArticleAttributes = article.attributes

const coverUrl = computed(() => getStrapiMedia(ArticleAttributes.cover?.data?.attributes?.url) ?? '/default-cover.jpg');
const categoryName = computed(() => ArticleAttributes.category?.data?.attributes?.name ?? 'Uncategorized');
const articleTitle = computed(() => ArticleAttributes.title);
const articleDescription = computed(() => ArticleAttributes.description);
const authorAvatarUrl = computed(() => getStrapiMedia(ArticleAttributes.author?.data?.attributes?.avatar?.data?.attributes?.url) ?? '/default-avatar.jpg');
const authorName = computed(() => ArticleAttributes.author?.data?.attributes?.name ?? 'Unknown Author');

</script>