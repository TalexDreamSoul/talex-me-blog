<script setup lang="ts">
definePageMeta({
  layout: 'home',
  select: 'Sponsor',
})

const platforms = reactive([
  {
    label: 'GitHub',
    icon: 'i-carbon-logo-github',
    url: 'https://github.com/TalexDreamSoul/talex-me-blog',
  },
  {
    label: 'WeChat',
    icon: 'i-carbon-logo-wechat',
    url: 'https://afdian.net/a/talexdreamsoul',
  },
  {
    label: 'Ali Pay',
    icon: '<svg t="1705137818112" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1463" data-darkreader-inline-fill="" width="200" height="200"><path d="M620.544 587.264c54.272-98.304 73.728-192 73.728-192H512V326.144h216.576v-29.696H512V193.024h-98.816v103.424h-197.12v29.696h197.12v69.12H245.76v29.696h339.968c0 5.12 0 5.12-5.12 9.728 0 34.304-24.576 83.456-44.544 123.392-250.88-98.816-325.12-39.424-344.576-29.696-167.424 118.272-9.728 266.24 14.848 261.12 177.152 39.424 290.816-34.304 369.664-128 5.12 5.12 9.728 5.12 14.848 5.12 54.272 29.696 315.392 152.576 315.392 152.576v-147.968c-39.424-0.512-182.272-49.664-285.696-83.968z m-128 44.032c-123.392 157.696-270.848 108.544-295.424 98.304-58.88-14.848-78.848-123.392-5.12-157.696 123.392-39.424 231.424 5.12 310.272 44.544-5.12 10.24-9.728 14.848-9.728 14.848z" fill="" p-id="1464"></path></svg>',
    url: 'https://afdian.net/a/talexdreamsoul',
  },
  {
    label: 'PayPal',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M7.914 10.677h1.659c3.604 0 5.649-1.623 6.3-4.96c.021-.11.04-.216.056-.322c.036-.226.054-.429.062-.624c.006-.134.01-.213.009-.287a2.643 2.643 0 0 0-.216-1.039c-.129-.296-.324-.587-.613-.918C14.318 1.557 12.832 1 11.057 1H5.404a.81.81 0 0 0-.799.683l-1.02 6.571l-1.269 8.185a.486.486 0 0 0 .48.561h2.772l.849-5.043a1.51 1.51 0 0 1 1.497-1.28m9.103-4.587c-.792 3.771-3.357 5.772-7.445 5.772H7.914a.331.331 0 0 0-.328.282L6.481 19h2.907a.707.707 0 0 0 .699-.597l.029-.15l.555-3.514l.036-.194a.707.707 0 0 1 .699-.597h.44c2.85 0 5.081-1.158 5.733-4.506c.268-1.38.132-2.534-.562-3.352"/></svg>',
    url: 'https://www.buymeacoffee.com/talexdreamsoul',
  },
  {
    label: 'Coffee',
    icon: `<svg width="30" height="30" viewBox="0 0 20 30" fill="none"
    xmlns="http://www.w3.org/2000/svg" data-v-d62e9236="">
    <path d="M16.9039 6.6125L16.8852 6.60109L16.8418 6.5874C16.8593 6.60264 16.8811 6.61147 16.9039 6.6125Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M17.1801 8.64746L17.1592 8.65334L17.1801 8.64746Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M16.9142 6.60782C16.9115 6.60748 16.9089 6.60686 16.9064 6.60596C16.9062 6.60769 16.9062 6.60943 16.9064 6.61116C16.9092 6.61079 16.9119 6.60963 16.9142 6.60782Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M16.9062 6.60777H16.9092V6.60596L16.9062 6.60777Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M17.1631 8.64175L17.1947 8.62312L17.2065 8.61628L17.2171 8.60449C17.1971 8.61343 17.1788 8.62605 17.1631 8.64175Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M16.9581 6.65451L16.9272 6.62409L16.9062 6.6123C16.9175 6.63286 16.9361 6.64801 16.9581 6.65451Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M9.19178 26.3623C9.1671 26.3733 9.14548 26.3906 9.12891 26.4125L9.14839 26.3996C9.16163 26.387 9.18038 26.3722 9.19178 26.3623Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M13.7012 25.44C13.7012 25.4111 13.6876 25.4164 13.6909 25.519C13.6909 25.5107 13.6943 25.5023 13.6957 25.4943C13.6976 25.4761 13.699 25.4582 13.7012 25.44Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M13.2318 26.3623C13.2071 26.3733 13.1855 26.3906 13.1689 26.4125L13.1884 26.3996C13.2017 26.387 13.2204 26.3722 13.2318 26.3623Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M6.01247 26.5793C5.99374 26.5624 5.97081 26.5514 5.94629 26.5474C5.96614 26.5572 5.986 26.5671 5.99924 26.5747L6.01247 26.5793Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M5.29369 25.8674C5.29076 25.8374 5.28187 25.8084 5.26758 25.7822C5.2777 25.8095 5.28618 25.8375 5.29295 25.8659L5.29369 25.8674Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M10.101 13.1236C9.11927 13.5606 8.0052 14.0562 6.56133 14.0562C5.95731 14.0549 5.35623 13.9687 4.77441 13.8L5.77303 24.4623C5.80837 24.908 6.00359 25.3235 6.31992 25.6264C6.63624 25.9293 7.05053 26.0974 7.48052 26.0973C7.48052 26.0973 8.89645 26.1738 9.36892 26.1738C9.87742 26.1738 11.4022 26.0973 11.4022 26.0973C11.8321 26.0973 12.2463 25.9291 12.5626 25.6263C12.8788 25.3234 13.074 24.9079 13.1093 24.4623L14.1789 12.68C13.7009 12.5103 13.2185 12.3975 12.6747 12.3975C11.7342 12.3971 10.9764 12.7339 10.101 13.1236Z" fill="#FFDD00" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #ffe01a;"></path>
    <path d="M1.68066 8.58594L1.69758 8.60229L1.70861 8.60913C1.70011 8.6004 1.69075 8.59262 1.68066 8.58594Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
    <path d="M18.7951 7.59668L18.6448 6.80786C18.5098 6.10009 18.2035 5.43133 17.505 5.17553C17.281 5.0937 17.027 5.05853 16.8553 4.88914C16.6836 4.71975 16.6328 4.45668 16.5931 4.21273C16.5196 3.76498 16.4505 3.31684 16.3751 2.86986C16.31 2.48558 16.2585 2.05388 16.089 1.70134C15.8684 1.22797 15.4107 0.951136 14.9555 0.767982C14.7222 0.677434 14.4842 0.600836 14.2425 0.538562C13.1053 0.22655 11.9096 0.11184 10.7397 0.0464551C9.33541 -0.0341284 7.92739 -0.00984969 6.52646 0.119105C5.48372 0.217755 4.38547 0.337054 3.39458 0.712157C3.03241 0.849427 2.65922 1.01423 2.38383 1.30521C2.04593 1.66272 1.93563 2.21562 2.18234 2.66146C2.35773 2.97807 2.65481 3.20175 2.96991 3.34973C3.38034 3.54039 3.80898 3.68548 4.24869 3.78257C5.47306 4.06399 6.74118 4.17449 7.99202 4.22152C9.3784 4.27971 10.767 4.23256 12.1468 4.08043C12.488 4.04143 12.8286 3.99465 13.1686 3.9401C13.569 3.87625 13.826 3.33176 13.7079 2.95245C13.5668 2.49896 13.1873 2.32307 12.7582 2.39151C12.695 2.40184 12.6321 2.4114 12.5689 2.42096L12.5233 2.42784C12.3779 2.44696 12.2326 2.4648 12.0872 2.48137C11.7869 2.51502 11.4859 2.54255 11.1842 2.56396C10.5084 2.6129 9.83078 2.63546 9.15352 2.63661C8.48802 2.63661 7.82216 2.61711 7.15813 2.57161C6.85516 2.55096 6.55293 2.5247 6.25143 2.49284C6.11429 2.47793 5.97752 2.46225 5.84074 2.44466L5.71058 2.42746L5.68227 2.42325L5.54733 2.40299C5.27157 2.35978 4.99581 2.31007 4.723 2.25004C4.69547 2.24369 4.67084 2.22776 4.6532 2.20489C4.63555 2.18201 4.62593 2.15357 4.62593 2.12424C4.62593 2.09491 4.63555 2.06646 4.6532 2.04359C4.67084 2.02072 4.69547 2.00479 4.723 1.99844H4.72815C4.96456 1.94606 5.20282 1.90132 5.44181 1.86232C5.52147 1.84932 5.60138 1.83657 5.68153 1.82408H5.68374C5.83338 1.81376 5.98377 1.78584 6.13268 1.76749C7.42825 1.62735 8.73152 1.57957 10.0334 1.62448C10.6654 1.6436 11.2971 1.68222 11.9262 1.74875C12.0615 1.76328 12.1961 1.77858 12.3306 1.79579C12.3821 1.80229 12.4339 1.80993 12.4858 1.81643L12.5902 1.83211C12.8946 1.87927 13.1975 1.9365 13.4987 2.00379C13.9451 2.10474 14.5183 2.13762 14.7169 2.64617C14.7801 2.80753 14.8088 2.98686 14.8437 3.15625L14.8882 3.37229C14.8893 3.37616 14.8902 3.38012 14.8908 3.38414C14.9959 3.89396 15.1012 4.40379 15.2066 4.91361C15.2143 4.95127 15.2145 4.99018 15.2071 5.02792C15.1998 5.06566 15.185 5.10141 15.1637 5.13295C15.1425 5.16449 15.1152 5.19113 15.0836 5.21122C15.052 5.23131 15.0168 5.24441 14.9801 5.24971H14.9772L14.9128 5.25889L14.8492 5.26768C14.6477 5.29496 14.446 5.32045 14.244 5.34415C13.8462 5.39131 13.4477 5.4321 13.0487 5.46651C12.2557 5.53508 11.4612 5.58008 10.665 5.60149C10.2594 5.6127 9.85382 5.61793 9.44839 5.61717C7.83466 5.61584 6.22231 5.5183 4.61931 5.32504C4.44577 5.30362 4.27222 5.28068 4.09868 5.25736C4.23325 5.27533 4.00088 5.24359 3.95382 5.23671C3.84351 5.22065 3.73321 5.20395 3.62291 5.18662C3.25265 5.12888 2.88461 5.05776 2.51509 4.99544C2.06836 4.91896 1.64112 4.9572 1.23704 5.18662C0.905356 5.37538 0.636902 5.66483 0.467493 6.01636C0.293214 6.39108 0.241372 6.79906 0.163424 7.2017C0.0854765 7.60433 -0.0358577 8.03755 0.010102 8.45089C0.109007 9.34295 0.708691 10.0679 1.57126 10.23C2.38273 10.383 3.19861 10.5069 4.01669 10.6124C7.23031 11.0217 10.4769 11.0707 13.7006 10.7585C13.9631 10.733 14.2253 10.7052 14.4871 10.6751C14.5688 10.6658 14.6516 10.6756 14.7292 10.7038C14.8069 10.732 14.8775 10.7779 14.9358 10.8382C14.9942 10.8985 15.0389 10.9716 15.0666 11.0521C15.0943 11.1327 15.1043 11.2186 15.0959 11.3037L15.0143 12.1289C14.8498 13.7963 14.6854 15.4635 14.5209 17.1306C14.3493 18.8814 14.1766 20.632 14.0028 22.3824C13.9538 22.8754 13.9048 23.3683 13.8558 23.8611C13.8087 24.3463 13.8021 24.8468 13.7135 25.3263C13.5737 26.0803 13.0829 26.5434 12.3667 26.7128C11.7105 26.8681 11.0402 26.9496 10.3672 26.9559C9.6212 26.9601 8.87555 26.9257 8.12953 26.9299C7.33314 26.9345 6.35769 26.8581 5.74294 26.2417C5.20282 25.7002 5.12818 24.8525 5.05464 24.1195C4.9566 23.1491 4.85941 22.1788 4.76308 21.2086L4.22259 15.8138L3.87293 12.3231C3.86704 12.2654 3.86116 12.2084 3.85565 12.1503C3.81373 11.7339 3.53025 11.3263 3.08352 11.3473C2.70114 11.3649 2.26654 11.7029 2.3114 12.1503L2.57061 14.7382L3.10669 20.0913C3.2594 21.6118 3.41174 23.1327 3.56371 24.6537C3.59312 24.9451 3.6207 25.2372 3.65158 25.5286C3.81961 27.1207 4.98883 27.9788 6.43674 28.2204C7.2824 28.3619 8.14865 28.391 9.00681 28.4055C10.1069 28.4238 11.218 28.4678 12.3001 28.2606C13.9035 27.9547 15.1066 26.8412 15.2783 25.1141C15.3273 24.6155 15.3763 24.1167 15.4254 23.6179C15.5884 21.9681 15.7511 20.3182 15.9136 18.6681L16.4453 13.2767L16.6891 10.8059C16.7012 10.6834 16.751 10.5682 16.831 10.4773C16.911 10.3865 17.0169 10.3249 17.1332 10.3015C17.5917 10.2086 18.03 10.0499 18.3561 9.68708C18.8753 9.10933 18.9786 8.35606 18.7951 7.59668ZM1.54773 8.1297C1.55472 8.12626 1.54185 8.18859 1.53633 8.21765C1.53523 8.17367 1.53744 8.13467 1.54773 8.1297ZM1.59222 8.4876C1.5959 8.48492 1.60693 8.50021 1.61832 8.51857C1.60104 8.50174 1.59001 8.48913 1.59185 8.4876H1.59222ZM1.63598 8.54763C1.65179 8.57554 1.66024 8.59313 1.63598 8.54763V8.54763ZM1.72385 8.62181H1.72605C1.72605 8.62448 1.7301 8.62716 1.73157 8.62984C1.72913 8.62689 1.72642 8.6242 1.72348 8.62181H1.72385ZM17.1119 8.51092C16.9472 8.67381 16.699 8.74952 16.4538 8.78737C13.7035 9.2118 10.9132 9.42669 8.13284 9.33186C6.14297 9.26113 4.17405 9.03132 2.20404 8.74187C2.011 8.71358 1.8018 8.67687 1.66906 8.52889C1.41904 8.24976 1.54185 7.68768 1.60693 7.35044C1.66649 7.04148 1.78047 6.62967 2.13381 6.5857C2.68533 6.5184 3.32582 6.76044 3.87146 6.84648C4.52837 6.95074 5.18774 7.03422 5.84956 7.09693C8.67406 7.36458 11.546 7.32291 14.358 6.93136C14.8705 6.85973 15.3812 6.7765 15.8901 6.68168C16.3435 6.59717 16.8461 6.43849 17.12 6.92677C17.3079 7.25943 17.3329 7.70451 17.3038 8.08038C17.2949 8.24414 17.2261 8.39816 17.1115 8.51092H17.1119Z" fill="#191924" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #d5d1cc;"></path>
</svg>`,
    url: 'https://www.buymeacoffee.com/talexdreamsoul',
  },
])

function genIcon(svg: string) {
  const _svg = encodeURIComponent(svg)

  return `--un-icon: url(data:image/svg+xml;utf8,${_svg})`
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="Index">
    <h1 my-6 font-size-8 font-bold>
      Donate me please!
    </h1>
    <p font-size-4 op-80>
      In order to encourage me to keep writing, keep producing.
    </p>

    <div my-16 class="Platforms">
      <h3 font-size-6>
        You can donate me on these platforms.
      </h3>
      <div my-4 font-size-4 op-80>
        If there is no you can donate my platform here, it's okay, thank you for having this heart
        <div class="heart">
          <div class="hrt lef" />
          <div class="hrt cen" />
          <div class="hrt rig" />
        </div>.
      </div>

      <div my-20 class="PlatformWrapper">
        <div v-for="(platform, index) in platforms" :key="index" class="PlatformItem" @click="open(platform.url)">
          <span v-if="platform.icon?.[0] === 'i'" :class="platform.icon" />
          <span v-else :style="genIcon(platform.icon)" />
          {{ platform.label }}
        </div>
      </div>

      <p relative mt-20 font-size-5 font-bold op-80>
        Thank you everyone who supports me all the way.
      </p>
    </div>
  </div>
</template>

<style>
.heart {
  position: relative;
  display: inline-block;

  width: 24px;
  height: 16px;
}

.hrt {
  position: relative;

  left: 0;
  top: 0;

  width: 10px;
  height: 10px;
  background-color: #d50924;
  box-shadow: 0 0 70px #eb0c0c;
  animation: sport 1s infinite;
}

.lef {
  border-radius: 100px;
  position: absolute;
  top: 2px;
  left: 0px;
}

.rig {
  border-radius: 100px;
  position: absolute;
  top: 2px;
  left: 10px;
}

.cen {
  transform: rotate(45deg);
  position: absolute;
  top: 6.9px;
  left: 5px;
}

@keyframes sport {
  0% {
    transform: scale(1) rotate(45deg);
  }

  50% {
    transform: scale(1.1) rotate(45deg);
  }

  100% {
    transform: scale(1) rotate(45deg);
  }
}

@keyframes show {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;

  }
}

.PlatformItem span {
  margin-top: .125rem;
  margin-right: .25rem;

  width: 1.25rem;
  height: 1.25rem;

  background-size: 200%;
  background-position: 0%;
  background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
}

.PlatformItem span {
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}

.PlatformItem {
  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    padding: 2px 0;

    left: 0;
    bottom: 0;

    width: 100%;
    height: 2px;

    border-radius: 5px;
    transform: scale(0, .75) translateY(-10px);
    transition: transform .35s, height .5s, opacity .25s;
    background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }

  &::after {
    z-index: -2;
    content: "";
    position: absolute;
    padding: 2px 0;

    left: 0;
    bottom: -2px;

    opacity: 0;
    width: 100%;
    height: 10px;

    transition: .35s;
    filter: blur(10px) brightness(100%);
    background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }

  position: relative;
  padding: 2px 0;
  display: flex;

  justify-content: center;

  width: 8ch;

  font-weight: 600;

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  transition: all .25s;
  border-radius: 5px;
  background-size: 200%;
  background-position: 100%;
  background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
}

.PlatformItem:hover {

  &::before,
  &::after {
    background-size: 400%;
    animation: show 8s linear infinite;
  }

  &::before {
    opacity: .25;
    height: 100%;

    transform: scale(1, 1) translateY(0px);
    transition: transform .35s, height .15s, opacity .15s;
  }

  &::after {
    opacity: 1;
    filter: blur(20px) brightness(120%);
    transform: scale(1, 1) translateX(0px);
  }

  width: 10ch;
  cursor: pointer;

  background-position: 0%;
  background-size: 400%;
  animation: show 8s linear infinite;

  backdrop-filter: blur(10px) brightness(200%);
}

.PlatformItem:hover span {
  background-position: 0%;
  background-size: 400%;
  animation: show 8s linear infinite;
}

.PlatformWrapper {
  display: flex;
  gap: 1rem;

  justify-content: center;
}

.Index {
  position: relative;
  padding: 2rem;

  left: 50%;
  min-width: 30%;
  max-width: 65ch;

  text-align: center;
  box-sizing: border-box;
  transform: translateX(-50%);
}
</style>
