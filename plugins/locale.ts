// import {  } from "pin";

import zh_CN from 'locales/zh-CN'
import en_US from 'locales/en-US'
import { Ref } from 'vue'

export default defineNuxtPlugin(nuxtApp => {
  const locales = {
    'zh-CN': zh_CN,
    'en-US': en_US
  }

  const cookieLang = useCookie('lang')
  const locale = useState<string>('locale-plugin', () => {
    let fallback = 'en-US'
    // 检查 cookie 是否设置语言
    // 在开启【预渲染】的情况下，以下初始化只有SSR的情况下才能生效
    if (typeof cookieLang.value === 'string') {
      return cookieLang.value
    }

    if (process.server) {
      // Learn more about the nuxtApp interface on https://v3.nuxtjs.org/docs/usage/nuxt-app#nuxtapp-interface-advanced
      //const reqLocale = nuxtApp.ssrContext?.req.headers['accept-language']?.split(',')[0]
      // TODO 这里官方给的参考是上面这行，但是实际上（文档里面）req 在 event 里面, 可能是BUG
      const reqLocale = nuxtApp.ssrContext?.event.req.headers['accept-language']?.split(',')[0]
      if (reqLocale) {
        fallback = reqLocale
      }
    } else {
      // 【预渲染】的情况下，这里代码不会在客户端执行，除非关闭预渲染【ssr=false】
      const navLang = navigator.language
      if (navLang) {
        fallback = navLang
      }
    }
    return fallback
  })

  return {
    provide: {
      localeNames: Object.keys(locales),
      locale: {
        init: () => {
          if (typeof cookieLang.value === 'string') {
            // 已经手动指定语言的情况
            locale.value = cookieLang.value
          } else {
            // 未手动指定语言的情况
            locale.value = navigator.language
          }
        },
        set: (lang: string) => {
          console.log('change to lang ' + lang)
          locale.value = lang
          cookieLang.value = lang
        },
        get: () => locale.value
      },
      // 获取本地化文本
      t: (lable: keyof typeof locales['en-US']) => (locales[locale.value] && locales[locale.value][lable]) || locales['en-US'][lable],
      // 本地化时间
      localeDate: (date: Ref<Date> | Date, targetLocale = locale) => {
        return computed(() => new Intl.DateTimeFormat(targetLocale.value, { dateStyle: 'full' }).format(unref(date)))
      }
    }
  }
})
