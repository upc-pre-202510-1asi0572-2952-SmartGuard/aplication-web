<template>
    <div class="flex flex-col">
        <label v-if="label" class=" text-gray-700 mb-2">{{ label }}</label>
        <input :type="type" :value="modelValue" :placeholder="_placeholder"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputTexto',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        _placeholder: {
            type: String,
            default: 'Botón'
        },
        type: {
            type: String,
            default: 'text'
        }
    }
})
</script>
