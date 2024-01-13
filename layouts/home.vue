<script setup>
import { useBackground } from '~/composables/useBackground'

onMounted(useBackground)
const route = useRoute()
const router = useRouter()
const online = useOnline()

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

  refreshFocus(route)

  router.afterEach((to) => {
    refreshFocus(to)
  })
})
onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))

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
  <main relative h-full w-full>
    <!-- sticky -->
    <div top-0 w-full flex justify-between class="Home-Header">
      <div flex items-center pl-4 font-bold>
        TalexMeBlog
      </div>
      <div flex>
        <ul class="only-pc-display" h-16 flex items-center>
          <TouchHeadBtn
            v-for="(item, index) in menus.list"
            :key="index" :focus="index === menus.ind" :style="`--d: ${(index + 1) * 0.075}s`"
            @click="handleClick(index, item.path)"
          >
            {{ item.label }}
          </TouchHeadBtn>
        </ul>
        <ul class="only-pe-display" 1 h-16 flex items-center>
          <li
            v-for="(item, index) in menus.list" :key="index"
            :class="item.icon" :style="`--d: ${(index + 1) * 0.075}s;color: ${index === menus.ind ? 'var(--text-color)' : 'var(--text-color-light)'}`"
            @click="handleClick(index, item.path)"
          />
        </ul>
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

  box-sizing: border-box;

  background-color: #ffffff50;
  backdrop-filter: blur(16px) brightness(120%) saturate(180%);
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
