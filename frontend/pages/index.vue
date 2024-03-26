<template>
  <div>
    <Heading :title="props?.global?.siteName" :description="props?.global?.siteDescription" />
    <div class="flex gap-5 justify-center align-middle">
      <UButton :ui="{ rounded: 'rounded-2xl' }" size="xl" color="sky" variant="solid" :disabled="page === 1"
        @click="changePage(-1)">
        <template #default>
          <UIcon name="i-heroicons-arrow-left-20-solid" /> Back
        </template>
      </UButton>
      <div class="backdrop-blur-md rounded-2xl bg-blue-500/30 py-2 self-center">
        <transition-group name="slide" tag="span">
          <span v-for="pageNumber in totalPageCount" :key="pageNumber"
            class="cursor-pointer transition-all duration-500" @click="goToPage(pageNumber)"
            :class="{ 'bg-sky-500 text-white rounded-2xl p-3 font-bold': pageNumber === page }">
            <span class="px-6 text-xl">{{ pageNumber }}</span>
          </span>
        </transition-group>
      </div>
      <UButton :ui="{ rounded: 'rounded-2xl' }" size="xl" color="sky" :square="false" variant="solid"
        :disabled="isLastPage" @click="changePage(+1)">
        <template #default>Next
          <UIcon name="i-heroicons-arrow-right-20-solid" />
        </template>
      </UButton>
    </div>
    <Articles :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface GlobalProps {
  siteName: string;
  siteDescription: string;
}

const props = defineProps<{
  global: GlobalProps;
}>();

const page = ref<number>(1);
const total = ref<number>(0);
const articles = ref<any[]>([]);
const pageSize = 3;
const { find } = useStrapi();

const fetchData = async () => {
  try {
    const { data, meta } = await find('articles', {
      pagination: { page: page.value, pageSize },
      populate: 'deep'
    });
    articles.value = data;
    total.value = meta.pagination.total;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);

const updatePage = () => fetchData();
const changePage = (direction: number) => { page.value += direction; updatePage(); };
const totalPageCount = computed(() => Math.ceil(total.value / pageSize));
const goToPage = (pageNumber: number) => { page.value = pageNumber; updatePage(); };
const isLastPage = computed(() => Math.ceil(total.value / pageSize) === page.value);
</script>

<style>
body {
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
