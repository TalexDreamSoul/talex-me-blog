<script setup lang="ts">
definePageMeta({
  layout: 'home',
  select: 'Home',
})

const contactLists = reactive([
  {
    label: 'GitHub',
    icon: 'i-carbon-logo-github',
    url: 'https://github.com/TalexDreamSoul',
  },
])
</script>

<template>
  <div class="Index">
    <h1 my-6 font-size-8 font-bold class="fadein" style="--d: 0s">
      TaGzxia
    </h1>

    <div mb-8 class="Index-Intro fadein" style="--d: .125s">
      <p my-2>
        Hey, I am TaGzxia, an optimistic student.
      </p>

      <div my-4>
        <p>
          Like researching, exploring.
        </p>
        <p>
          Creator of <strong>TalexSeries</strong>, <strong>TalexTouch</strong>, <strong>Tradoraz</strong> and
          <strong>Kxord</strong>.
        </p>
        <p>
          Core team member of <strong>TalexSeries</strong>, <strong>TalexTouch</strong>, <strong>PVPIN Studio</strong>.
        </p>
      </div>

      <div my-4 class="fadein" style="--d: .225s">
        Dreaming up ideas and making them realized is where my passion lies. You can find my <strong>full projects list
          here</strong>.
        My idol is <strong>Anthony Fu</strong> who created lots of utils. I also do some video cutting, painting and UI
        designing.
      </div>

      <div my-4 class="fadein" style="--d: .335s">
        Outside of programming, I enjoy doing photography and listening music. Some of my music can be found on my own
        <strong>NetEase Music List</strong>.
        If you happen to be in the same city I live (currently in ChengDu), maybe we can hang out and take some photos or
        code together.
      </div>
    </div>

    <div class="Index-Contact fadein" style="--d: .445s">
      <p my-4 font-size-4>
        Find me on
      </p>

      <a v-for="item in contactLists" :key="item.label" flex :href="item.url">
        <i i-carbon-logo-github mr-2 mt-.5 block target="_blank" />
        {{ item.label }}
      </a>

      <p my-4>
        If you enjoy my works, consider sponsoring me on <strong><i i-carbon-logo-xing /> Github Sponsor</strong> or <strong><i i-carbon-lightning /> 爱发电</strong> to keep them sustainable.
      </p>
    </div>

    <p font-size-3 op-25>
      <span class="fadein" style="--d: .5s">
        CC BY-NC-SA 4.0 2021-PRESENT © TaGzxia
      </span>
    </p>
  </div>
</template>

<style>
@keyframes fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadein {

  opacity: 0;
  transform: translateY(5px);

  animation: fade .35s var(--d) forwards ease-out;
}

.Index-Contact {

  color: var(--text-color-light);
}

.Index-Contact a {
  position: relative;

  width: max-content;

  color: var(--text-color);
}

.Index-Contact a::after {
  content: "";
  position: absolute;

  bottom: -2px;

  width: 100%;
  height: 2px;

  opacity: .125;
  background-color: var(--text-color);
}

.Index-Intro {

  font-size: 16px;

  color: var(--text-color-light);
}

.Index-Intro strong {
  color: var(--text-color);
}

.Index {
  position: relative;
  padding: 2rem;

  left: 50%;
  min-width: 30%;
  max-width: 65ch;

  box-sizing: border-box;
  transform: translateX(-50%);

}
</style>
