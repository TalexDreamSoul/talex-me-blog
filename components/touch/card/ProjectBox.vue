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
  border-radius: 12px;
  box-sizing: border-box;
}

.ProjectBox:hover {
  opacity: 1;

  background-color: var(--major-color-lightest);
  backdrop-filter: blur(10px) brightness(150%);
}
</style>
