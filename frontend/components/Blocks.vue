<template>
    <div v-for="block in blocks" :key="block.id">
        <div v-if="block.__component === 'shared.rich-text'" class="prose max-w-4xl mx-auto py-8 px-3 text-neutral-200">
            <div v-html="mdRenderer.render(block.body)" />
        </div>

        <div v-else-if="block.__component === 'shared.media'" class="py-8">
            <img :src="getStrapiMedia(block.file.data.attributes.url) || ''"
                class="mt-6 w-3/4 m-auto rounded-3xl shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]" />
        </div>
        <div v-else-if="block.__component === 'shared.quote'" class="px-3 py-6">
            <blockquote class="container max-w-xl border-l-4 border-neutral-300 py-2 pl-6 ml-60 text-neutral-300">
                <p class="text-5xl font-medium italic">{{ block.body }}</p>
                <cite class="mt-4 block font-bold uppercase not-italic">
                    {{ block.title }}
                </cite>
            </blockquote>
        </div>
        <div v-else-if="block.__component === 'shared.slider'">
            <MediaSlider :files="block.files.data" />
        </div>
        <div v-else>{{ block }}</div>
    </div>
</template>

<script setup lang="ts">
import md from "markdown-it";
const mdRenderer = md();

defineProps<{
    blocks: [
        {
            id: string;
            title: string;
            body: string;
            __component: any;
            file: any;
            files: any;
        }
    ];
}>();
</script>
