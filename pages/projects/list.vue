<script lang="ts" setup>
const projects = reactive({
  current: {
    title: 'talex-touch',
    desc: 'The all new applications for whole platforms.',
  },
  front: [
    {
      title: 'talex-touch-wikis',
      desc: 'Step forward to next generation wiki system.',
    },
    {
      title: 'talex-touch-im',
      desc: 'Light style UI system for IM.',
    },
    {
      title: 'talex-touch-qq',
      desc: 'Touch the new world by TQQ',
    },
  ],
  ends: [
    {
      title: 'talex-general-ends',
      desc: 'Mysterious, easy to use all ends.',
    },
    {
      title: 'Talexs',
      desc: 'AI energized SpringBoot framework.',
    },
  ],
  others: [
    {
      title: 'Tython',
      desc: 'TorCompiler of Python',
    },
    {
      title: 'Taikye',
      desc: 'Serializer and Analyser in Java.',
    },
    {
      title: 'RobotSystem',
      desc: 'Ever EYY for CoolQ',
    },
  ],
})

definePageMeta({
  layout: 'home',
  select: 'Projects',
})

function randomFadeIn(base: number) {
  return Math.random() * base + 50
}

function redirect(url: string) {
  console.log(url)
}
</script>

<template>
  <div :style="`--t: ${randomFadeIn(0)}ms`" class="Projects fades" gap-8>
    <div mb-8 class="Projects-Head">
      <h1 :style="`--t: ${randomFadeIn(50)}ms`" class="fades" align-center text-10 font-600>
        Projects
      </h1>
    </div>

    <div :style="`--t: ${randomFadeIn(100)}ms`" class="Projects-BoxWrapper fades">
      <p>Current Focus</p>
      <TouchCardProjectBox :style="`--t: ${randomFadeIn(150)}ms`" class="fades" :item="projects.current" />
    </div>

    <div :style="`--t: ${randomFadeIn(200)}ms`" class="Projects-BoxWrapper fades">
      <p>FrontEnds</p>
      <TouchCardProjectBox
        v-for="item in projects.front" :key="item.title" :style="`--t: ${randomFadeIn(250)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(300)}ms`" class="Projects-BoxWrapper fades">
      <p>BackEnds</p>
      <TouchCardProjectBox
        v-for="item in projects.ends" :key="item.title" :style="`--t: ${randomFadeIn(350)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(400)}ms`" class="Projects-BoxWrapper fades">
      <p>Others</p>
      <TouchCardProjectBox
        v-for="item in projects.others" :key="item.title" :style="`--t: ${randomFadeIn(450)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(500)}ms`" mb-8 class="Projects-Foot fades">
      <em style="color: var(--text-color-light)">
        Thanks for getting interested in my works! If like them or find them useful, consider
        <a style="color: var(--text-color)">sponsoring me</a>
        to support me keeping them sustainable. Cheers! :)</em>

      <br>
      <br>

      <p :style="`--t: ${randomFadeIn(550)}ms`" class="fades" style="color: var(--text-color-light)">
        All projects sort by time created!
      </p>
    </div>
  </div>
</template>

<style>
.fades {
  opacity: 0;

  animation: fades .25s var(--t) cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

@keyframes fades {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }

}

.Projects-Foot {
  margin-top: 4rem;

  left: 50%;

  min-width: 400px;
  width: 40%;

  transform: translateX(-50%);

  position: relative;
}

.Projects-BoxWrapper>p {
  font-weight: 600;
  font-size: 18px;

  opacity: .75;

  margin: 5rem 0 0.5rem;
}

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

  text-align: center;
  box-sizing: border-box;
  justify-content: center;
  transform: translateX(-50%);
}
</style>
