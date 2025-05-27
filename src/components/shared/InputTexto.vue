<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-gray-700 mb-2">{{ label }}</label>
    <input
        :type="type"
        :value="modelValue"
        :placeholder="_placeholder"
        @input="onInput"
        class="px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
    />
  </div>
</template>

  <script lang="ts">
  import {defineComponent, type PropType} from 'vue'

  export default defineComponent({
      name: 'InputTexto',
    props: {
      modelValue: {
        // Aceptamos string, number o null
        type: [String, Number] as PropType<string | number | null>,
        default: ''
      },
      label: {
        type: String as PropType<string>,
        default: ''
      },
      _placeholder: {
        type: String as PropType<string>,
        default: ''
      },
      type: {
        type: String as PropType<string>,
        default: 'text'
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const onInput = (e: Event) => {
        const val = (e.target as HTMLInputElement).value;
        if (props.type === 'number') {
          // Si el campo está vacío, pasamos null; si no, lo convertimos a número
          emit('update:modelValue', val === '' ? null : Number(val));
        } else {
          emit('update:modelValue', val);
        }
      };
      return { onInput };
    }
  });
  </script>
