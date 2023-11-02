<script setup>
import { sleep, useWrapperValue } from '~/composables/common'

const props = defineProps({
  focus: {
    type: Boolean,
    default: false,
  },
})

const floater = ref(null)
const hover = ref(false)

watchEffect(async () => {
  const value = props.focus || hover.value

  const el = floater.value
  if (!el)
    return

  if (el) {
    if (value) {
      el.style.opacity = 1
      el.style.transform = 'scaleX(1)'

      await sleep(50)

      el.style.left = '105%'

      await sleep(100)

      el.style.width = '2px'
    }
    else {
      await sleep(200)

      el.style.left = '-5%'

      await sleep(100)

      el.style.width = '2px'

      await sleep(100)

      el.style.opacity = 0
      el.style.transform = 'scaleX(0)'
    }
  }
})
</script>

<template>
  <li relative :class="{ focus }" class="HeadButton" @mouseenter="hover = true" @mouseleave="hover = false">
    <div ref="floater" class="HeadButton-Floater" />
    <slot />
  </li>
</template>

<style>
.HeadButton::before {
  z-index: -1;
  content: "";
  position: absolute;

  left: 0;
  top: 0;

  width: 0;
  height: 100%;

  background-color: var(--theme-color);

  transition: width .25s .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.HeadButton:hover, .HeadButton.focus {
  color: white;
  transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.HeadButton:hover::before, .HeadButton.focus::before {
  width: 100%;
}

.HeadButton:hover::first-letter, .HeadButton.focus::first-letter {
  font-weight: unset;
  color: unset;
  text-decoration: unset;
}

.HeadButton .HeadButton-Floater {
  position: absolute;

  width: 2px;
  height: 90%;

  left: -5%;
  top: 5%;

  opacity: 0;

  transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: var(--theme-color);
}

@keyframes join {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
