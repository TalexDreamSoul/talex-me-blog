<template>
  <div class="GradientCard">
    <slot />
  </div>
</template>

<style>
.GradientCard {
  position: relative;
  padding: .5rem;
  /* display: inline-block; */

  min-width: 30rem;
  min-height: 35rem;

  cursor: pointer;
  /* overflow: hidden; */
  border-radius: 12px;
  backdrop-filter: blur(18px) saturate(180%) brightness(120%);
  background-color: var(--major-color-light);
}

.GradientCard:hover {
  background-color: transparent;
}

.GradientCard:hover::before,
.GradientCard:hover::after {
  opacity: 1 !important;
}

.GradientCard::before {
  z-index: -1;
  content: "";
  position: absolute;

  width: 102%;
  height: 102%;

  top: -1%;
  left: -1%;

  border-radius: 12px;

  opacity: 0;
  transition: .35s;
  animation: animate 2.5s linear infinite;
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
}

.GradientCard::after {
  z-index: -2;
  content: "";
  position: absolute;

  width: 100%;
  height: 100%;

  bottom: -15%;
  left: 50%;

  opacity: 0;
  transition: .5s;
  border-radius: 12px;
  filter: blur(5rem);
  transform: translateX(-50%) scale(.8);
  animation: animate 2.5s linear infinite;
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
}

@keyframes animate {
  from {
    --rotate: 0deg;
  }

  to {
    --rotate: 360deg;
  }
}

@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}
</style>
