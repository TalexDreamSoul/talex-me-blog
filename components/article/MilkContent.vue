<script setup>
import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { commonmark } from '@milkdown/preset-commonmark'
import { listenerCtx } from '@milkdown/plugin-listener'
import { nord } from '@milkdown/theme-nord'
import { outline } from '@milkdown/utils'
import '@milkdown/theme-nord/style.css'

const props = defineProps(['content'])
const emits = defineEmits(['outline'])
onMounted(async () => {
  const editor = await Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, document.querySelector('#MilkEditor'))

      watchEffect(() => {
        ctx.set(defaultValueCtx, props.content)
      })

      ctx.update(editorViewOptionsCtx, prev => ({
        ...prev,
        editable: () => false,
      }))

      // const outlineView = getOutline(defaultValueCtx)

      // console.log(outlineView)
    })
    .use(commonmark)
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
</style>
