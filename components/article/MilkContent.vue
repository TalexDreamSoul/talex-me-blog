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
  padding: 4px 12px;

  color: var(--text-color-light);

  max-width: calc(100vw - 30%);
}

.MilkContent h1, .MilkContent h2, .MilkContent h3, .MilkContent h4,
.MilkContent h5, .MilkContenth h6 {
  color: var(--text-color);
}
</style>
