<template>
  <div>
    <Heading class="text-center" :title="articleTitle" :description="articleDescription" />
    <div class="px-4 py-4 flex mt-2 items-center justify-center">
      <img class="w-10 h-10" :src="authorAvatarUrl" style="border-radius: 50%; object-fit: cover" :alt="articleTitle" />
      <div>
        <span class="px-2 self-center text-neutral-300">{{ authorName }}</span>
        <div v-if="articlePublishedAt" class="px-2 self-center text-neutral-300">
          {{ articlePublishedDate }}
        </div>
      </div>
    </div>
    <img v-if="articleCoverUrl" class="mt-6 w-3/4 m-auto rounded-3xl shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]"
      :src="articleCoverUrl" />

    <main class="mt-8">
      <Blocks v-if="articleBlocks" :blocks="articleBlocks" />
    </main>
  </div>
</template>

<script setup>
const { find } = useStrapi()
const route = useRoute();
const matchingArticle = await find("articles", { filters: { slug: route.params.slug }, populate: 'deep' })
const article = matchingArticle.data[0].attributes;

//These Variables for nested properties
const articleTitle = article?.title;
const articleDescription = article?.description;
const authorName = article?.author?.data?.attributes?.name;
const authorAvatarUrl = getStrapiMedia(article?.author?.data?.attributes?.avatar?.data?.attributes?.url);
const articlePublishedAt = article?.publishedAt;
const articlePublishedDate = new Date(articlePublishedAt).toLocaleDateString();
const articleCoverUrl = getStrapiMedia(article?.cover?.data?.attributes?.url);
const articleBlocks = article?.blocks;

</script>
