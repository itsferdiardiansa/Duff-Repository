<template>
  <div :class="`${prefixClass}-control--textarea`">
    <editor
      ref="editorEl"
      model-events="change keydown blur focus paste"
      v-model="content"
      @selectionChange="handleChange"
      @init="editorInit"
      :initialValue="modelValue"
      :apiKey="API_KEY"
      :init="{
        height: 200,
        menubar: false,
        plugins: plugins,
        toolbar: toolbar,
      }"
    />
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    Editor,
  },
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    onError: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const content = ref('');
    const API_KEY = ref(SATPAM_TINY_MCE_KEY);
    const editorEl = ref();
    const plugins = reactive([
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ]);

    const toolbar = ref(`
      undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help
    `);

    const handleChange = (node, el) => {
      emit('update:modelValue', el.getContent());
    };

    const editorInit = (node, editor) => {
      editor.on('input', e => {
        if (e.inputType === 'deleteContentBackward')
          emit('update:modelValue', editor.getContent());
      });
    };

    onMounted(() => {
      const editorInstance = unref(editorEl);

      editorInstance.$.emitsOptions = {
        'update:modelValue': null,
      };

      content.value = props.modelValue;
    });

    watch(
      () => props.modelValue,
      val => {
        content.value = val;
      }
    );

    return {
      API_KEY,
      editorEl,
      content,
      plugins,
      toolbar,
      handleChange,
      editorInit,
    };
  },
};
</script>
<style lang="scss" src="@common/Form/style.scss" scoped></style>
