<template>
  <div example="other/locale">
    <h1 class="text-xl opacity-50">Nuxt birthday</h1>
    <p class="text-4xl">
      {{ $localeDate(new Date('2016-10-26')) }}
    </p>
    <div class="mt-4" />
    <label for="locale-chooser">Preview a different locale</label>
    <select
      id="locale-chooser"
      :value="$locale.get()"
      class="m-auto w-50 border n-border-base rounded p-1"
      @input="$locale.set(($event.target as HTMLSelectElement).value)"
    >
      <option v-for="l of $localeNames" :key="l" :value="l">
        {{ l }}
      </option>
    </select>
  </div>
  <h1>{{ $t('lable') + ' : ' + $t('lang') + ' : ' + $t('hello') }}</h1>
</template>

<script setup lang="ts">
const nuxt = useNuxtApp()
onMounted(() => {
  // 预渲染的情况下，客户端渲染需要重新初始化语言设置
  nuxt.$locale.init()
})
</script>
