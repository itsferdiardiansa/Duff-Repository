<template>
  <div :class="`${prefixClass}-form-control`">
    <label 
      :class="`${prefixClass}-form-control--label`"
      v-if="label"
    >
      {{ label }}
    </label>

    <div class="w-full relative" :class="{'has-error': onError}">
      <editor
        ref="textareaEl"
        @selectionChange="handleInput"
        @init="editorInit"
        :apiKey="API_KEY"
        :init="{
          height: 200,
          menubar: false,
          plugins: plugins,
          toolbar: toolbar
        }"
        model-events="change keydown blur focus paste"
      />
    </div>

    <template v-if="onError && errorMessage">
      <span class="text-red-400 text-sm italic">{{ errorMessage }}</span>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  emits: [
    'update:modelValue'
  ],
  components: {
    Editor
  },
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    onError: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  },
  setup(props, { emit }) {
    const editor = reactive({})
    const API_KEY = ref(MP2_TINY_MCE_KEY)
    const textareaEl = ref()
    const plugins = reactive([
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ])

    const toolbar = ref(`
      undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help
    `)

    const handleInput = (instance, el) => {
      emit('update:modelValue', el.getContent())
    }
    const updateContent = val => {
      return val
    }

    const initialValue = computed(() => {
      return props.modelValue
    })

    const editorInit = e => {
      editor.value = e
    }
    watch(
      () => props.modelValue,
      (val, prevValue) => {
        if(!prevValue.length)
          editor?.value?.target?.setContent(val)
      }
    )

    return {
      API_KEY,
      textareaEl,
      plugins,
      toolbar,
      handleInput,
      updateContent,
      initialValue,
      editorInit
    }
  }
}
</script>
<style lang="scss" src="@common/Form/style.scss" scoped></style>