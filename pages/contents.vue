<script setup lang="ts">
import { articleManager, useListsLocal } from '~/composables/article'

const route = useRoute()
const router = useRouter()
const view = ref<{
  path: string
  list: any[]
}>({
  path: '',
  list: [],
},
)

definePageMeta({
  layout: 'home',
  select: 'Contents',
})

async function refreshList() {
  view.value.list = []

  setTimeout(async () => {
    view.value.path = (route.query.path || 'personal') as string

    const list = await articleManager.getListsLocal(view.value.path)

    view.value.list = list
  }, 100)
}

onMounted(refreshList)
router.afterEach(refreshList)

function calcReadingTime(len: number) {
  return Math.ceil(len / 400)
}

async function handleClick(item: any) {
  const directPath = `${view.value.path}/${item.name}`

  if (item.isDirectory) {
    await router.push({
      query: {
        path: directPath,
      },
    })

    await refreshList()
  }
  else {
    await router.push(`/article/${encodeURIComponent(directPath)}`)
  }
}

async function handleBack() {
  const path = view.value.path

  const _path = path.replace(`/${path.split('/').at(-1)}`, '')

  await router.push({
    query: {
      path: _path,
    },
  })

  await refreshList()
}
</script>

<template>
  <div class="Contents">
    <aside v-if="0">
      THIS IS A DEMO ASIDE.
    </aside>

    <div class="Main">
      <div
        v-for="(item, index) in view.list"
        :key="index"
        my-4
        flex
        class="Main-Item fadein"
        :style="`--d: ${index * 0.045}s`"
        @click="handleClick(item)"
      >
        <span mr-1 mt-.5>
          <i v-if="!item.isDirectory" i-carbon-document block />
          <i v-else i-carbon-folder block />
        </span>
        {{ item.name }}
        <span
          v-if="!item.isDirectory"
          class="tag"
          style="transform: scale(0.75); opacity: 0.25"
        >
          {{ calcReadingTime(item.size) }} min
        </span>
        <span
          v-if="item.cpp"
          class="tag"
          style="background-color: #ffd140; transform: scale(0.75); opacity: 0.25"
        >
          CODES
        </span>
      </div>

      <div
        v-if="view.path.includes('/')"
        class="Main-Item fadein"
        :style="`--d: ${view.list.length * 0.045 + 0.25}s`"
        @click="handleBack"
      >
        cd ..
      </div>
    </div>

    <div v-if="false" class="Addon">
      <p>ADDON AREA</p>
      THIS IS A DEMO ADDON AREA.
    </div>
  </div>
</template>

<style>
@keyframes fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.Main-Item:hover {
  color: var(--text-color);
}

.Main-Item {
  display: flex;

  height: 24px;
  color: var(--text-color-light);

  cursor: pointer;

  overflow: hidden;
  justify-content: start;
  align-items: center;
}

.fadein {
  opacity: 0;
  transform: translateY(5px);

  animation: fade 0.35s var(--d) forwards ease-out;
}

.Contents aside {
  width: 15%;

  backdrop-filter: brightness(110%);
}

.Contents .Main {
  position: relative;
  display: flex;

  flex-direction: column;

  width: auto;

  border-radius: 8px;
  /* backdrop-filter: brightness(130%); */
}

.Contents .Addon {
  padding: 8px 12px;

  width: 30%;

  backdrop-filter: brightness(110%);
}

.Contents {
  position: relative;
  margin: 2rem 1rem;

  height: calc(100% + 5.5rem);

  left: 50%;
  width: max-content;
  max-width: 70%;
  min-width: 250px;

  box-sizing: border-box;
  transform: translateX(-50%) translateX(-1rem);
  /* height: auto; */
}
</style>
