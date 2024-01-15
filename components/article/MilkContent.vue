<script setup>
import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { listenerCtx } from '@milkdown/plugin-listener'
import { nord } from '@milkdown/theme-nord'
import { prism, prismConfig } from '@milkdown/plugin-prism'
import { outline } from '@milkdown/utils'
import '@milkdown/theme-nord/style.css'

import 'prism-themes/themes/prism-nord.css'

import markdown from 'refractor/lang/markdown'
import css from 'refractor/lang/css'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import tsx from 'refractor/lang/tsx'
import cpp from 'refractor/lang/cpp'
import c from 'refractor/lang/c'
import python from 'refractor/lang/python'
import java from 'refractor/lang/java'
import { useRichArticle } from '~/composables/rich-article.ts'

const props = defineProps(['content'])
const emits = defineEmits(['outline'])
onMounted(async () => {
  const editor = await Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, document.querySelector('#MilkEditor'))

      watchEffect(() => {
        ctx.set(defaultValueCtx, props.content)

        setTimeout(() => {
          useRichArticle(document.querySelector('#MilkEditor'))
        }, 1000)
      })

      ctx.update(editorViewOptionsCtx, prev => ({
        ...prev,
        editable: () => false,
      }))

      ctx.set(prismConfig.key, {
        configureRefractor: (refractor) => {
          refractor.register(markdown)
          refractor.register(css)
          refractor.register(javascript)
          refractor.register(typescript)
          refractor.register(jsx)
          refractor.register(tsx)
          refractor.register(cpp)
          refractor.register(c)
          refractor.register(python)
          refractor.register(java)
        },
      })
    })
    .use(commonmark)
    .use(prism)
    .create()

  const _outline = editor.action(outline)(editor.ctx)

  emits('outline', _outline)
})
</script>

<template>
  <div id="MilkEditor" class="MilkContent milkdown-theme-nord prose" />
</template>

<style>
.MilkContent {
  padding: .5rem 1.5rem;

  color: var(--text-color);

  max-width: calc(100vw - 30%);
}

.MilkContent h1 {
  position: relative;
  font-size: 30px;

  background: radial-gradient(circle at 0%, #3d33f3AA .0125%, var(--theme-color) 1.25%, var(--text-color-light) 10%, var(--major-color) 100%);
}

.MilkContent h2 {
  opacity: 0.95;
  font-size: 24px;

  background: radial-gradient(circle at 0%, #3d33f3AA .0125%, var(--theme-color) .25%, var(--text-color-light) 5%, var(--major-color) 100%);
}

.MilkContent h3 {
  opacity: 0.9;
  font-size: 20px;
  background: radial-gradient(circle at 0%, #3d33f3AA .0125%, var(--theme-color) .125%, var(--text-color-light) 2.5%, var(--major-color) 100%);
}

.MilkContent h4 {
  opacity: 0.85;
  font-size: 18px;
}

.MilkContent h5 {
  opacity: 0.8;
  font-size: 16px;
}

.MilkContent h6 {
  opacity: 0.75;
  font-size: 14px;
}

.MilkContent h1,
.MilkContent h2,
.MilkContent h3,
.MilkContent h4,
.MilkContent h5,
.MilkContent h6 {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

pre .rich-copy .did {
  position: absolute;

  opacity: 0;
  transition: .25s;
  transform: translateX(5px);
}

pre .rich-copy .un {
  position: absolute;

  transition: .25s;
  transform: translateX(0);
}

pre .rich-copy.did .un {
  opacity: 0;
  transform: translateX(-5px);
}

pre .rich-copy.did {
  width: 60px;
}

pre .rich-copy.did .did {
  opacity: 1;
  transform: translateX(0);
}

pre .rich-copy {
  position: absolute;
  padding: 2px 4px;

  right: 5px;
  top: 5px;

  width: 40px;
  height: 25px;

  opacity: .5;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  border-radius: 4px;
  transition: all .2s;
  background-color: var(--major-color);
}

pre .rich-copy:hover {
  opacity: 1;
  cursor: pointer;
}

pre .rich-lang {
  position: absolute;

  right: 1%;
  bottom: 1%;

  opacity: .5;
}

.rich-quote-shadow.enter::before {
  opacity: 1 !important;
}

.rich-quote-shadow {
  &::before {
    content: "";
    position: absolute;

    left: var(--x);
    top: var(--y);

    width: 20px;
    height: 20px;

    opacity: 0;
    filter: blur(20px) brightness(500%);
    background:
      linear-gradient(to right, var(--theme-color), var(--text-color)),
      linear-gradient(145deg, var(--text-color-light) 80%, var(--theme-color) 90%);
    transition: opacity .25s;
  }

  position: relative;
  padding: 2px;

  transform: translate(var(--offX), var(--offY));
  transition: .125s;
  overflow: hidden;
}

blockquote {
  &::before {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: -1%;
    width: 100%;
    height: 100%;

    --x: 0;
    --y: 0;

    opacity: .2;
    border-radius: 8px;
    background:
      linear-gradient(to right, var(--theme-color), var(--text-color)),
      linear-gradient(145deg, var(--text-color-light) 80%, var(--theme-color) 90%);
  }

  margin: 0 !important;

  padding: .001rem 1rem;
}

blockquote p {
  pointer-events: none;
}

.dark blockquote::before,
.dark pre::before {
  opacity: .35;
  background-color: var(--major-color);
}

code {
  &::after {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    opacity: 1;
    border-radius: 4px;
    background-color: var(--major-color-light);
  }

  position: relative;
  padding: 2px 6px;
}

pre code::after {
  display: none;
}

blockquote,
pre {
  &::after {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    /* opacity: .35; */
    border-radius: 8px;
    background-color: var(--major-color-light);
  }

  position: relative;

  border-radius: 8px;
}

.rich-watermark .watermark {
  position: absolute;

  bottom: 0;
  right: 5px;

  color: #AAA;
  text-shadow:
    -1px 1px #ccc,
    -1px -1px #ccc;

  pointer-events: none;

  opacity: .5;
  mix-blend-mode: difference;
}

.rich-watermark {
  position: relative;
  display: inline-block;
}
</style>
