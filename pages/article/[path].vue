<script setup lang="ts">
import dayjs from 'dayjs'

// import localeCh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useArticle } from '~/composables/article'
import { useSticky } from '~/composables/sticky'
import { useDynamicCode } from '~/composables/hook'

definePageMeta({
  layout: 'home',
  select: 'Contents',
})

const route = useRoute<'article-path'>()
const router = useRouter()
const article = reactive<any>({})
const addon = ref<HTMLElement | null>(null)
const aside = ref<HTMLElement | null>(null)
const speaker = ref<any>({
  utter: null,
  play: false,
})

function toggleSpeak() {
  if (!speaker.value.utter)
    speaker.value.utter = new SpeechSynthesisUtterance(article.body)

  if (!speaker.value.play) {
    window.speechSynthesis.speak(speaker.value.utter)
    speaker.value.play = true
  }
  else {
    window.speechSynthesis.pause()
    speaker.value.play = false
  }
}

onMounted(async () => {
  try {
    const data = await useArticle(decodeURIComponent(route.params.path), '')

    Object.assign(article, data)

    // get header clientHeight
    // const header = document.querySelector('.Home-Header') as HTMLElement

    useSticky(addon.value!, /* header.clientHeight +  */addon.value!.offsetTop)
    useSticky(aside.value!, /* header.clientHeight +  */aside.value!.offsetTop)

    setTimeout(() => {
      window._effectResize?.()

      console.log(window._effectResize)
    }, 200)
  }
  catch (e) {
    article.error = e
    console.error(e)
  }
})

function handleOutline(outline: object) {
  article.outline = outline
}

// dayjs.locale(localeCh)
dayjs.extend(relativeTime)

const timeStr = computed(() => dayjs(article?.time).fromNow())
const readTime = computed(() => Math.ceil(article.body?.length / 400))

const asides = reactive([
  {
    title: 'BaCK',
    icon: 'i-carbon-arrow-left',
    func: () => {
      // Check if can history back
      if (window.history?.state?.back)
        window.history.go(-1)

      else
        router.push('/contents')
    },
  },
  {
    title: 'Star',
    icon: 'i-carbon-star',
    func: () => { },
  },
  {
    title: 'Speak',
    icon: 'i-carbon-user-speaker',
    func: toggleSpeak,
  },
  {
    title: 'Share',
    icon: 'i-carbon-share',
    func: () => {
      useDynamicCode(location.href)
    },
  },
])
</script>

<template>
  <div class="ArticleIndex">
    <div ref="aside" relative h-full class="Aside only-pc-display">
      <div v-for="(item, index) in asides" :key="index" class="Aside-Item" @click="item.func">
        <p :class="item.icon" />
        <span>{{ item.title }}</span>
      </div>
    </div>

    <div px-8 py-8 class="Main">
      <div class="Main-Header">
        <h1 font-bol4 font-size-10>
          <span v-if="article.header?.title">
            {{ article.header.title }}
          </span>
          <span v-else class="waiting" />
        </h1>
        <div v-if="article.header" class="Main-Header-Tags" flex items-center gap-4>
          <span class="copyright tag">
            Original
          </span>
          <span class="author">
            {{ article.header.author }}
          </span>

          <div flex gap-1>
            <span mt-.5 class="i-carbon:calendar" />
            <span class="time" op-75>
              {{ timeStr }}
            </span>
          </div>

          <div flex gap-1>
            <span mt-.5 class="i-carbon:view" />
            <span class="watch" op-75>
              {{ article.body.length }}
            </span>
          </div>

          <div flex gap-1>
            <span mt-.5 class="i-carbon:alarm" />
            <span class="time" op-75>
              Read about {{ readTime }} minutes
            </span>
          </div>
        </div>
        <div v-else mt-2 w-3xl flex items-center gap-4>
          <span v-for="i in 4" class="waiting" style="height: 2.5rem" />
        </div>
      </div>
      <div v-if="article.error" class="Main-Error">
        Cannot find target page.
        <br>
        <p>{{ article.error }}</p>
      </div>
      <ArticleMilkContent v-else-if="article.body" :content="article.body" @outline="handleOutline" />
    </div>

    <div ref="addon" class="Addon only-pc-display">
      <div v-if="article.header" class="Box">
        <p>RELATIVE TAGS</p>
        <span v-for="(tag, index) in article.tags" :key="index" style="background-color: #F4BF7540;color: #AeAeAe" mr-2 op-75 class="tag">
          {{ tag }}
        </span>
      </div>

      <div v-if="article.header" class="Box">
        <p>AUTHOR INTRODUCTION</p>
        <span>
          No more information about {{ article.header.author }}.
        </span>
      </div>

      <div class="Box">
        <p>ON THIS PAGE</p>

        <ArticleContentOutline v-if="article.outline" :outline="article.outline" />
        <div v-else style="height: 10rem" class="waiting" />
      </div>

      <div class="Box">
        <p>RELATION POSTS</p>
        <span>NONE</span>
      </div>

      <div v-if="article?.header?.ai_generated" class="Box">
        <p>AI ASSISTANT</p>
        <span v-if="article?.header?.ai_generated === 'verified'" font-bold color-yellow-600 op-50>This article is
          generated by AI or helped with AI, but was verified manually.</span>
        <span v-else font-bold color-red-800 op-75>This article is generated by AI or helped with AI, please note to
          distinguish information.</span>
      </div>
    </div>
  </div>
</template>

<style>
.Aside .Aside-Item {
  position: relative;
  margin: 1rem 0;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;

  font-size: 12px;

  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  backdrop-filter: brightness(110%) blur(18px);
  box-shadow: 2px 2px 8px 2px var(--major-color-light);
}

.Aside .Aside-Item span {
  opacity: 0;

  transition: all .25s;
  transform: translateY(-5px);
}

.Aside .Aside-Item:hover {
  backdrop-filter: brightness(95%);
}

.Aside .Aside-Item:hover span {
  opacity: 1;

  transform: translateY(0);
}

.Aside .Aside-Item:hover p {
  opacity: .75;

  transform: scale(.75) translateY(-2.5px);
}

.Aside .Aside-Item p {
  font-size: 24px;

  opacity: 1;

  transition: all .25s;
  transform: translateY(10px);
}

.Main-Error {
  display: flex;

  justify-content: center;
}

.ArticleIndex aside {
  width: 15%;

  backdrop-filter: brightness(110%);
}

.ArticleIndex .Main {
  position: relative;

  flex: 1;

  width: 100%;

  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px var(--major-color-light);
  backdrop-filter: brightness(120%)  blur(18px);
}

.dark .ArticleIndex .Main {
  box-shadow: 2px 2px 8px 2px var(--major-color-lightest);
}

.ArticleIndex .Addon {
  z-index: 1;
  position: relative;

  width: 20%;
  height: 100%;
}

.ArticleIndex .Addon .Box p {
  opacity: .75;

  font-weight: 600;

  margin-bottom: .5rem;
}

.ArticleIndex .Addon .Box {
  padding: 1rem;
  margin-bottom: 1rem;

  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px var(--major-color-light);
  backdrop-filter: brightness(110%) blur(18px);
}

.dark .ArticleIndex .Addon .Box {
  box-shadow: 2px 2px 8px 2px var(--major-color-lightest);
}

.ArticleIndex {
  position: relative;
  padding-top: 2rem;

  display: flex;

  gap: 2rem;

  left: 50%;

  min-width: 65ch;
  max-width: 135ch;
  /* height: auto; */
  height: calc(100% + 5.5rem);

  transform: translateX(-50%);

}

@media (max-width: 768px) {
  .ArticleIndex {
    padding-top: 0;

    width: 100%;
    min-width: unset;
  }

  .Main-Header-Tags {
    display: flex;
    /* flex-direction: column; */

    align-items: self-start;
    zoom: .65;
  }

  .MilkContent {
    max-width: unset !important;
  }
}
</style>
