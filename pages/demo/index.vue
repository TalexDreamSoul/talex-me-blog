<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { flowLayout } from './flow-layout'

const { width, height } = useWindowSize()

const projects = reactive([
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A strong adaptation more platform all-tool program. :electron:',
  },
  {
    logo: 'https://github.com/Talexs/talex-wiki-views/raw/develop/.github/imgs/web1.png',
    title: 'TalexWiki',
    url: 'https://github.com/Talexs/talex-wiki-views',
    desc: 'The next generation wiki system, making wiki management easy and strong.',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A strong adaptation more platform all-tool program. :electron:',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A strong adaptation more platform all-tool program. :electron:',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A strong adaptation more platform all-tool program. :electron:',
  },
])

definePageMeta({
  layout: 'home',
  select: 'Demo',
})

const container = ref()
onMounted(() => {
  flowLayout(container.value)
})

function redirect(url: string) {
  console.log(url)
}
</script>

<template>
  <div class="Projects" gap-8>
    <div mb-8 class="Projects-Head">
      <h1 align-center text-10 font-600>
        Demos
      </h1>
      <span italic op-70>Demonstrations for projects I am working on from all wheres.</span>
    </div>
    <div ref="container" class="Projects-Content">
      <TouchCardGradientCard
        v-for="(item, index) in projects"
        :key="index"
        data-item="true"
        style="width: 0; opacity: 0"
        @click="redirect(item.url)"
      >
        <img class="Project-Img" :src="item.logo" :alt="item.title">
        <!-- <div class="Project-Img">
          <img :src="item.logo" :alt="item.title">
        </div> -->

        <div class="Project-Foot">
          <h1>{{ item.title }}</h1>
          <p>{{ item.desc }}</p>
        </div>
      </TouchCardGradientCard>
    </div>
  </div>
</template>

<style>
.Projects-Head {
  position: relative;

  width: max-content;

  left: 50%;

  transform: translateX(-50%);
}

.Project-Img {
  position: relative;

  width: 100%;

  object-fit: cover;
  border-radius: 12px;
}

html.dark .Project-Foot {
  color: fff;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5));
}

.Project-Foot {
  z-index: 1;
  position: absolute;
  padding: 1rem 1rem;

  width: 100%;

  bottom: 0;

  color: #fff;
  box-sizing: border-box;
  mix-blend-mode: difference;
  border-radius: 12px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(255, 255, 255, 0.5));
}

.Project-Foot h1 {
  font-size: 18px;
  font-weight: 600;
}

.Project-Foot p {
  font-size: 16px;
  opacity: 0.75;
}

.Project-Img img {
  position: absolute;

  width: 100%;
  /* height: 80%; */

  opacity: 0.75;
  border-radius: 8px;
}

.Projects-Content {
  position: relative;
  padding: 1rem;

  left: 10%;

  width: 80%;
  height: 100%;

  overflow: hidden;
}

.Projects {
  position: relative;
  padding: 2rem;

  width: 100%;
  height: 100%;

  left: 50%;
  box-sizing: border-box;
  justify-content: center;
  transform: translateX(-50%);
}
</style>
