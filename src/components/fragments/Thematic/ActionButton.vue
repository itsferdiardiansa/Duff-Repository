<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button variant="orange" size="sm" :bold="true" @click="handleClick">
        <img svg-inline class="w-4 h-4" src="@icon/delete.svg" />
      </Button>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import Button from '@common/Button';

export default {
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore();

    const handleClick = () => {
      const { hash_id } = props.data;

      store.dispatch('thematicPage/deleteData', hash_id);
    };

    return {
      handleClick,
    };
  },
};
</script>
