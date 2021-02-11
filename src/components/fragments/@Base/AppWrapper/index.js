/* eslint-disable no-unused-vars */
import {
  defineComponent,
  h,
  ref,
  getCurrentInstance,
  unref,
  computed,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import globalSetting from '@plugin/globalSetting'
import ErrorComponent from '@base/Error'
import subscribeFormAction from './subscribeFormAction'
import asyncModuleLoad from './asyncModuleLoad'

const AppWrapper = defineComponent({
  beforeCreate() {
    const {
      appContext: { app },
    } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()

    store.subscribe(({ payload }, state) => {
      subscribeFormAction(payload, router)
    })

    // Handle async module load
    asyncModuleLoad()

    // register global mixin
    app.mixin(globalSetting)
  },
  beforeRouteEnter() {
    console.log('before router enter wrapper')
  },
  errorCaptured(error, component) {},
  setup(props, { slots }) {
    const store = useStore()

    const errorChunkModule = computed(() => store.getters['app/getChunks'])

    return () => {
      return unref(errorChunkModule).onError
        ? h(ErrorComponent, {})
        : slots.default()
    }
  },
})

export default AppWrapper
