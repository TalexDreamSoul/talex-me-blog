<script lang="ts" setup>
// import { useWindowSize } from '@vueuse/core'
import { flowLayout } from './flow-layout'

const projects = reactive([
  {
    logo: 'https://img.quotawish.com/i/2025/02/06/67a4509caefde.png',
    title: 'LeavesWord',
    url: 'https://github.com/QuotaWish/leaves-word',
    desc: 'Mnemonic Classification System with Advanced RAG-Augmented Word Embeddings',
  },
  {
    logo: 'https://github.com/Talexs/talex-wiki-views/raw/develop/.github/imgs/web1.png',
    title: 'TalexWiki',
    url: 'https://github.com/Talexs/talex-wiki-views',
    desc: 'The next generation wiki system, making wiki management easy and powerful',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'TalexTouch',
    url: 'https://github.com/talex-touch/talex-touch',
    desc: 'A versatile cross-platform toolkit powered by Electron',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'AI DevTools',
    url: 'https://github.com/example/ai-devtools',
    desc: 'AI-powered development assistant with code generation and optimization',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'CloudFlow',
    url: 'https://github.com/example/cloud-flow',
    desc: 'Modern workflow platform with customizable processes and automation',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'DataViz Pro',
    url: 'https://github.com/example/data-viz-pro',
    desc: 'Professional data visualization suite with real-time capabilities',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'SecureStore',
    url: 'https://github.com/example/secure-store',
    desc: 'Enterprise-grade encrypted storage with end-to-end security',
  },
  {
    logo: 'https://avatars.githubusercontent.com/u/114328891?s=48&v=4',
    title: 'DevOps Hub',
    url: 'https://github.com/example/devops-hub',
    desc: 'Unified DevOps platform with CI/CD, monitoring and analytics',
  },
])

definePageMeta({
  layout: 'home',
  select: 'Demo',
})

const container = ref()

function handleMouseMove(e: MouseEvent, element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  element.style.setProperty('--mouse-x', `${x}%`)
  element.style.setProperty('--mouse-y', `${y}%`)
}

onMounted(() => {
  flowLayout(container.value)

  // Add mouse tracking effect
  const cards = document.querySelectorAll('.TouchCardGradientCard')
  for (const card of cards) {
    const element = card as HTMLElement
    element.addEventListener('mousemove', e => handleMouseMove(e as MouseEvent, element))
  }
})

// Clean up event listeners
onUnmounted(() => {
  const cards = document.querySelectorAll('.TouchCardGradientCard')
  for (const card of cards) {
    const element = card as HTMLElement
    element.removeEventListener('mousemove', e => handleMouseMove(e as MouseEvent, element))
  }
})

function redirect(url: string) {
  window.open(url, '_blank')
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
        <div class="Project-Img">
          <div class="Project-Img-Container">
            <img :src="item.logo" :alt="item.title">
          </div>
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
  padding-bottom: 66.67%; /* 3:2 aspect ratio */
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.Project-Img::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  z-index: 1;
}

.Project-Img-Container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.02);
}

.Project-Img img {
  max-width: 85%;
  max-height: 85%;
  object-fit: contain;
  opacity: 0.9;
  border-radius: 8px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.TouchCardGradientCard {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

.TouchCardGradientCard::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.TouchCardGradientCard:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(255, 255, 255, 0.05);
}

.TouchCardGradientCard:hover::before {
  opacity: 1;
}

.TouchCardGradientCard:hover .Project-Img img {
  transform: scale(1.1);
  opacity: 1;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

html.dark .TouchCardGradientCard {
  background: rgba(30, 30, 30, 0.5);
  border-color: rgba(255, 255, 255, 0.05);
}

html.dark .Project-Img {
  background: rgba(0, 0, 0, 0.2);
}

html.dark .Project-Foot {
  color: #fff;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  mix-blend-mode: normal;
}

.Project-Foot {
  z-index: 2;
  position: absolute;
  padding: 1.5rem;
  width: 100%;
  bottom: 0;
  color: #000;
  box-sizing: border-box;
  background: linear-gradient(to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  backdrop-filter: blur(4px);
}

.Project-Foot h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(45deg, #2196f3, #e91e63);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html.dark .Project-Foot h1 {
  background: linear-gradient(45deg, #64b5f6, #ff4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Project-Foot p {
  font-size: 0.95rem;
  line-height: 1.4;
  opacity: 0.85;
  margin: 0;
}

.Projects-Content {
  position: relative;
  padding: 2rem;
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
  min-height: 200px;
}

.Projects {
  position: relative;
  padding: 3rem 0;
  width: 100%;
  /* background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%); */
}
</style>
