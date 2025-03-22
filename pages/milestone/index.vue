<script lang="ts" setup>
const milestones = reactive({
  current: {
    title: '2024 Q1',
    desc: 'Start a new journey of technology exploration',
  },
  recent: [
    {
      title: '2023 Q4',
      desc: 'Completed the reconstruction of my personal blog system',
    },
    {
      title: '2023 Q3',
      desc: 'Released the talex-touch framework',
    },
    {
      title: '2023 Q2',
      desc: 'Started the research of AI related projects',
    },
  ],
  past: [
    {
      title: '2023 Q1',
      desc: 'Reconstructed multiple open source projects',
    },
    {
      title: '2022',
      desc: 'Upgraded and optimized the technology stack',
    },
  ],
  future: [
    {
      title: '2024 Q2',
      desc: 'Started a new project in the plan',
    },
    {
      title: '2024 Q3',
      desc: 'Planned to build a technology community',
    },
  ],
})

definePageMeta({
  layout: 'home',
  select: 'Milestones',
})

function randomFadeIn(base: number) {
  return Math.random() * base + 50
}

function redirect(url: string) {
  console.log(url)
}
</script>

<template>
  <div :style="`--t: ${randomFadeIn(0)}ms`" class="Milestones fades" gap-8>
    <div mb-8 class="Milestones-Head">
      <h1 :style="`--t: ${randomFadeIn(50)}ms`" class="fades" align-center text-10 font-600>
        Milestones
      </h1>
    </div>

    <div :style="`--t: ${randomFadeIn(100)}ms`" class="Milestones-BoxWrapper fades">
      <p>Current Focus</p>
      <TouchCardProjectBox :style="`--t: ${randomFadeIn(150)}ms`" class="fades" :item="milestones.current" />
    </div>

    <div :style="`--t: ${randomFadeIn(200)}ms`" class="Milestones-BoxWrapper fades">
      <p>Recent Achievements</p>
      <TouchCardProjectBox
        v-for="item in milestones.recent" :key="item.title" :style="`--t: ${randomFadeIn(250)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(300)}ms`" class="Milestones-BoxWrapper fades">
      <p>Past Milestones</p>
      <TouchCardProjectBox
        v-for="item in milestones.past" :key="item.title" :style="`--t: ${randomFadeIn(350)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(400)}ms`" class="Milestones-BoxWrapper fades">
      <p>Future Plans</p>
      <TouchCardProjectBox
        v-for="item in milestones.future" :key="item.title" :style="`--t: ${randomFadeIn(450)}ms`"
        class="fades" :item="item"
      />
    </div>

    <div :style="`--t: ${randomFadeIn(500)}ms`" mb-8 class="Milestones-Foot fades">
      <em style="color: var(--text-color-light)">
        Thank you for your attention to my growth journey! If you are interested in my work, please
        <a style="color: var(--text-color)">support me</a>
        to continue. Cheers! :)
      </em>

      <br>
      <br>

      <p :style="`--t: ${randomFadeIn(550)}ms`" class="fades" style="color: var(--text-color-light)">
        All milestones are arranged in chronological order!
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

.Milestones-Foot {
  margin-top: 4rem;
  left: 50%;
  min-width: 400px;
  width: 40%;
  transform: translateX(-50%);
  position: relative;
}

.Milestones-BoxWrapper>p {
  font-weight: 600;
  font-size: 18px;
  opacity: .75;
  margin: 5rem 0 0.5rem;
}

.Milestones-Head {
  position: relative;
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
}

.Milestones {
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
