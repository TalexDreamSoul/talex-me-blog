<script setup lang="ts">
import { useLists } from '~/composables/article'

const route = useRoute()
const router = useRouter()
const view = ref({
  path: '',
  list: [],
})

definePageMeta({
  layout: 'home',
  select: 'Contents',
})

async function refreshList() {
  view.value.path = (route.query.path || 'personal') as string

  const list = await useLists(view.value.path)

  console.log(list)

  view.value.list = list
}

onMounted(refreshList)
router.afterEach(refreshList)

function calcReadingTime(len: number) {
  return Math.ceil(len / 1100)
}

async function handleClick(item) {
  const directPath = `${view.value.path}/${item.name}`

  if (item.type !== 'file') {
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
        :key="index" my-4 flex class="Main-Item fadein" :style="`--d: ${index * .025}s`"
        @click="handleClick(item)"
      >
        <span mr-1 mt-.5>
          <i v-if="item.type === 'file'" i-carbon-document block />
          <i v-else i-carbon-folder block />
        </span>
        {{ item.name }}
        <span v-if="item.type === 'file'" class="tag" style="background-color: #FFD14;transform: scale(.75);opacity: .25">
          {{ calcReadingTime(item.size) }} min
        </span>
      </div>

      <div v-if="view.path.includes('/')" class="Main-Item fadein" :style="`--d: ${(view.list.length * .025) + .5}s`" @click="handleBack">
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
  color: var(--text-color-light);

  cursor: pointer;
}

.fadein {

  opacity: 0;
  transform: translateY(5px);

  animation: fade .35s var(--d) forwards ease-out;
}

.Contents aside {
  width: 15%;

  backdrop-filter: brightness(110%);
}

.Contents .Main {
  position: relative;
  padding: 8px 12px;

  flex: 1;

  width: 100%;

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
  padding-top: 2rem;

  display: flex;

  gap: 2rem;

  width: 30%;
  /* height: auto; */
  height: calc(100% + 5.5rem);

  left: 35%;

}
</style>
