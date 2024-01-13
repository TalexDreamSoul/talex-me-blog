<script setup>
import { useBackground } from '~/composables/useBackground'

onMounted(useBackground)
const route = useRoute()
const router = useRouter()
const online = useOnline()

const article = ref({
  enable: false,
})

const menus = reactive({
  ind: -1,
  list: [
    {
      label: 'Home',
      path: '/',
      icon: 'i-carbon-home',
    },
    {
      label: 'Contents',
      path: '/contents',
      icon: 'i-carbon-table-of-contents',
    },
    {
      label: 'Projects',
      path: '/projects/list',
      icon: 'i-carbon-ibm-cloud-projects',
    },
    {
      label: 'BlogCasts',
      path: '/blogcasts',
      icon: 'i-carbon-watsonx-governance',
    },
    {
      label: 'Sponsor',
      path: '/support',
      icon: 'i-carbon-user-sponsor',
    },
    {
      label: 'Demo',
      path: '/demo',
      icon: 'i-carbon-ibm-cloud-security-compliance-center-workload-protection',
    },
  ],
})

function handleKeyDown(event) {
  if (!event.altKey)
    return

  const { key } = event

    ;[...menus.list].forEach((k, i) => {
    if (k.label[0].toLowerCase() === key.toLowerCase()) {
      menus.ind = i

      router.push(k.path)
    }
  })
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('scroll', handleScroll)

  refreshFocus(route)

  router.afterEach((to) => {
    refreshFocus(to)
  })
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('scroll', handleScroll)
})

let lastTop = -1

function handleScroll(e) {
  const thisTop = window.scrollY

  const _article = window._article
  if (thisTop < lastTop || thisTop < 100 || !_article) {
    article.value.enable = false
  }

  else {
    const maxHeight = document.body.clientHeight

    const per = thisTop / (maxHeight - 950)

    article.value._per = per

    Object.assign(article.value, _article)
    article.value.enable = true
  }

  lastTop = thisTop
}

function refreshFocus(route) {
  menus.list.forEach((item, index) => {
    if (item.label === route.meta.select)
      menus.ind = index
  })
}

function handleClick(index, path) {
  menus.ind = index

  router.push(path)
}
</script>

<template>
  <main :class="{ article: article.enable }" relative h-full w-full>
    <!-- sticky -->
    <div top-0 w-full flex justify-between class="Home-Header">
      <div flex items-center pl-4 font-bold>
        TalexMeBlog
      </div>
      <div flex>
        <div class="Header-Default">
          <ul class="only-pc-display" h-16 flex items-center>
            <TouchHeadBtn
              v-for="(item, index) in menus.list" :key="index" :focus="index === menus.ind"
              :style="`--d: ${(index + 1) * 0.075}s`" @click="handleClick(index, item.path)"
            >
              {{ item.label }}
            </TouchHeadBtn>
          </ul>
          <ul class="only-pe-display" h-16 flex items-center>
            <li
              v-for="(item, index) in menus.list" :key="index" :class="item.icon"
              :style="`--d: ${(index + 1) * 0.075}s;color: ${index === menus.ind ? 'var(--text-color)' : 'var(--text-color-light)'}`"
              @click="handleClick(index, item.path)"
            />
          </ul>
        </div>
        <div v-if="article.header" class="Header-Article">
          <h1> {{ article.header.title }}</h1>
          <span class="tag">
            {{ Math.ceil(article.body.length / 1100) }} min
          </span>
          <div class="percentage">
            <div class="percentage-bar" :style="`width: ${Math.round(article._per * 100)}%`">
            <span>{{Math.round(article._per * 100)}}%</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
    <div class="Home-Main" relative h-full>
      <slot />
      <div class="mx-auto mt-5 text-center text-sm opacity-25">
        <Suspense>
          <ClientOnly>
            <PageView v-if="online" />
            <div v-else>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div italic op50>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        Powered by TalexTouch template, extends by Vitesse.
        <br>
        Released under MIT License. Copyright TalexDreamSoul 2024.
      </div>
    </div>
  </main>
</template>

<style>
.percentage {
  position: relative;

  width: 120px;
  height: 20px;

  opacity: .75;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--major-color);
}

.percentage-bar {
  position: relative;

  left: 0;

  width: 100%;
  height: 100%;

  opacity: .75;
  border-radius: 8px 0 0 8px;
  background-color: var(--theme-color);
}

.percentage-bar span {
  position: absolute;

  right: 5px;
  top: 2px;

  font-size: 12px;
}

.article .Header-Default {
  opacity: 0;
  transform: translateY(-10px);
}

.Header-Default {
  transition: .25s;
}

.Header-Article {
  position: absolute;
  display: flex;

  gap: 1rem;
  height: 100%;
  right: 15%;

  align-items: center;

  opacity: 0;
  transition: .25s;
  transform: translateY(10px);
}

.Header-Article h1 {
  font-size: 20px;
  font-weight: 600;
}

.article .Header-Article {
  opacity: 1;
  transform: translateY(0px);
}

.Home-Header li {
  margin-right: 1rem;
  padding: 0 4px;

  opacity: 0;
  animation: join .25s var(--d) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.Home-Header li:hover {
  opacity: .75;

  cursor: pointer;
}

.Home-Header li::first-letter {
  font-weight: bolder;
  color: var(--theme-color);
  text-decoration: underline;
}

.Home-Header {
  z-index: 1;
  position: sticky;

  top: 0;

  box-sizing: border-box;

  background-color: #ffffff50;
  backdrop-filter: blur(16px) saturate(180%) brightness(120%);
}

.dark .Home-Header {
  background-color: #00000050;
}

@media (max-width: 768px) {
  .Home-Header {
    position: sticky;
  }
}
</style>
