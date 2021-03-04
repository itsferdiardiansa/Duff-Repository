/* eslint-disable no-unused-vars */
import {
  defineComponent,
  h,
  getCurrentInstance,
  unref,
  computed,
  ref,
  provide,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import globalSetting from '@plugin/globalSetting';
import ErrorComponent from '@base/Error';
import LoadingComponent from '@base/Loading';
import subscribeFormAction from './subscribeFormAction';
import asyncModuleLoad from './asyncModuleLoad';

const AppWrapper = defineComponent({
  beforeCreate() {
    const {
      appContext: { app },
    } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();

    store.subscribe(({ type, payload }, state) => {
      subscribeFormAction(payload, router);
    });

    // Handle async module load
    asyncModuleLoad();

    // register global mixin
    app.mixin(globalSetting);

    window.addEventListener('beforeunload', () => {
      console.log('window unload');
    });
  },
  beforeRouteLeave() {
    console.log('before router enter wrapper');
  },
  errorCaptured(error, component) {},
  setup(props, { slots }) {
    const store = useStore();
    let isCollapsed = ref(false);

    const toggleCollapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    provide('sidebarContext', {
      isCollapsed: isCollapsed,
      toggleCollapseSidebar,
    });

    const chunkModule = computed(() => store.getters['app/getChunks']);

    return () => {
      return unref(chunkModule)?.onError
        ? h(ErrorComponent, {})
        : unref(chunkModule)?.isFetching
        ? h(LoadingComponent)
        : slots.default();
    };
  },
});

export default AppWrapper;
