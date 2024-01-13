<script setup>
import QRCode from 'qrcode'
import { createCodeRenderer } from '~/composables/codeRender'

const props = defineProps(['content', 'close'])

const card = ref(null)

const range = [-10, 10]

function getRotate(range, value, max) {
  return value / max * (range[1] - range[0]) + range[0]
}

onMounted(() => {
  const _card = card.value

  _card.onmousemove = (e) => {
    const { offsetX, offsetY } = e
    const { offsetWidth, offsetHeight } = _card

    const ry = getRotate(range, offsetX, offsetWidth)
    const rx = -getRotate(range, offsetY, offsetHeight)

    _card.style.setProperty('--rx', `${rx}deg`)
    _card.style.setProperty('--ry', `${ry}deg`)
  }

  _card.onmouseleave = () => {
    _card.style.setProperty('--rx', '0deg')
    _card.style.setProperty('--ry', '0deg')
  }

  const cvs = document.querySelector('#code')

  QRCode.toCanvas(cvs, props.content, (error) => {
    if (error)
      console.error(error)

    const cr = createCodeRenderer(cvs)

    console.log(cr)
  })

  // QRCode.toDataURL(props.content, (err, url) => {
  //   console.log(url)
  // })
})
</script>

<template>
  <!-- <div class="DynamicCard-Wrapper"> -->
  <div ref="card" class="DynamicCode">
    <h1>QR Code</h1>

    <canvas id="code" />

    <p>Use Mobile scan code to continue.</p>

    <div class="DynamicCode-Slider" @click="close" />
  </div>
  <!-- </div> -->
</template>

<style>
.DynamicCode-Slider:hover {
  width: 40%;

  height: .5rem;

  opacity: 1;
}

.DynamicCode-Slider {
  position: absolute;

  left: 50%;
  bottom: 1%;

  width: 20%;
  height: .35rem;

  border-radius: 8px;
  background-color: var(--theme-color);

  opacity: .5;
  cursor: pointer;
  transform: translateX(-50%);

  transition: .25s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.DynamicCode h1 {
  position: absolute;

  top: 10%;

  font-size: 24px;
  font-weight: 600;
}

.DynamicCode p {
  position: absolute;

  bottom: 10%;
}

.DynamicCode canvas {
  opacity: 0;

  mix-blend-mode: difference;
  /* filter: drop-shadow(8px 8px 2px var(--text-color-light)); */

  animation: cvsJoin 2.25s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

@keyframes cvsJoin {
  from {
    opacity: 0;
    transform: translateY(20px) scale(.75)
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(2);
  }
}

/* @keyframes cardJoin {
  from {
    opacity: 0;
    transform: translate3D(0, 0px, 100px) scale(.75)
  }

  to {
    opacity: 1;
    transform: translate3D(0, 0px, -100px) scale(.75)
  }
} */

/* .DynamicCard-Wrapper {
  position: absolute;
  display: flex;

  justify-content: center;
  align-items: center;

  flex-direction: column;

  left: 0%;
  top: 0%;

  width: 100%;
  height: 100%;

  perspective: 2000px;

  animation: cardJoin 5.75s cubic-bezier(0.645, 0.045, 0.355, 1) forwards 1000;
  backdrop-filter: blur(18px);
  background-color: var(--major-color);
  backdrop-filter: brightness(130%) blur(18px);
  box-shadow: 4px 1px 24px 1px var(--major-color);
} */

.DynamicCode {
  position: absolute;
  display: flex;

  justify-content: center;
  align-items: center;

  flex-direction: column;

  left: 50%;
  top: 50%;

  width: 50ch;
  height: 60ch;

  border-radius: 12px;
  transition: all .5s;
  backdrop-filter: brightness(130%) blur(18px);
  box-shadow: 4px 1px 24px 1px var(--major-color);
  transform: perspective(3000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate(-50%, -50%);
  background-color: var(--major-color-light);
}
</style>
