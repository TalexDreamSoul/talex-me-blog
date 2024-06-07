<template>
  <div class="GradientCard">
    <div class="GradientCard-Container" />

    <slot />
  </div>
</template>

<style>
.GradientCard-Container {
  position: absolute;

  top: 0.25%;
  left: 0.25%;

  width: 100%;
  height: 99.5%;

  overflow: hidden;
  border-radius: 12px;
  box-sizing: border-box;
}

.GradientCard-Container::before {
  z-index: -1;
  content: "";
  position: absolute;

  top: 0.5%;
  left: 0.5%;

  width: 99%;
  height: 99%;

  opacity: 0.9;
  border-radius: 12px;
  background: var(--major-color);
  backdrop-filter: blur(18px) saturate(180%) brightness(120%);
}

.GradientCard {
  position: relative;
  padding: 0.5rem;

  /* width: 420px; */
  /* min-width: 30rem; */
  /* min-height: 15rem; */
  height: auto;

  cursor: pointer;
  /* overflow: hidden; */
  border-radius: 12px;
  backdrop-filter: blur(18px) saturate(180%) brightness(120%);
  background-color: var(--major-color-light);

  box-sizing: border-box;
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

  width: 101%;
  height: 101%;

  top: -0.5%;
  left: -0.5%;

  border-radius: 12px;

  opacity: 0;
  transition: 0.35s;
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
  transition: 0.5s;
  border-radius: 12px;
  filter: blur(5rem);
  transform: translateX(-50%) scale(0.8);
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
