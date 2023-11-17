<script lang="ts" setup>
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
    <div class="Projects-Content">
      <TouchCardGradientCard
        v-for="(item, index) in projects" :key="index" style="width: 25%"
        @click="redirect(item.url)"
      >
        <div class="Project-Img">
          <img :src="item.logo" :alt="item.title">
        </div>

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
  height: 60%;
}

.Project-Foot {
  padding-top: 1rem;
}

.Project-Foot h1 {
  font-size: 18px;
  font-weight: 600;
}

.Project-Img img {
  position: absolute;

  width: 100%;
  /* height: 80%; */

  opacity: .75;
  border-radius: 8px;
}

.Projects-Content {
  position: relative;
  display: flex;

  justify-content: space-between;
  flex-wrap: wrap;

  gap: 2rem;

  width: 100%;
  height: 100%;
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
