<script lang="ts" setup>
const props = defineProps(['item'])
</script>

<template>
  <a inline-flex class="ProjectBox">
    <div class="BoxAside">
      <i block class="i-carbon-arrow-right" />
    </div>
    <div class="BoxMain">
      <p>{{ props.item.title }}</p>
      <span>{{ props.item.desc }}</span>
    </div>
  </a>
</template>

<style scoped>
.BoxMain {
  display: flex;

  flex-direction: column;

  text-align: left;
}

.BoxMain>p {
  font-size: 20px;
  font-weight: 600;
}

.BoxMain>span {
  opacity: .75;
  font-size: 14px;
}

.BoxAside {
  display: flex;

  width: 20%;
  min-width: 48px;

  justify-content: center;
}

.ProjectBox {
  margin: .5rem 1rem;
  padding: 0.25rem 0.875rem 0.875rem;

  width: 350px;
  height: 90px;
  max-width: 100%;

  opacity: .75;

  cursor: pointer;
  align-items: center;
  box-sizing: border-box;

  position: relative;
}

.ProjectBox::before {
  content: "";
  position: absolute;

  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  opacity: 0;
  transition: opacity .25s;
  border-radius: 12px;
  filter: invert(100%);
  background-color: var(--major-color-lightest);
}

.ProjectBox:hover::before {
  opacity: 1;

  backdrop-filter: blur(18px) brightness(1%);
}

.ProjectBox:hover {

  backdrop-filter: blur(18px) saturate(180%);
}
</style>
