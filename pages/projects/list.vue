<script lang="ts" setup>
const projects = reactive([
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A strong adaptation more platform all-tool program. :electron:',
  },
])

definePageMeta({
  layout: 'home',
  select: 'Projects',
})
</script>

<template>
  <div class="Projects">
    <div v-for="(item, index) in projects" :key="index">
      {{ item }}
    </div>
  </div>
</template>
