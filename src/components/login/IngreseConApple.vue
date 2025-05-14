<template>

    <button
        class="py-2 px-4 rounded-xl border-2 border-gray-200 grid grid-cols-5 items-center gap-x-2 hover:bg-gray-100 transition-transform duration-150 active:scale-105">
        <img src="../../assets/Icons/Apple.png"   class="mx-2 pr-2 border-r-2 border-gray-200 col-span-1 select-none"  alt="icon" draggable="false" />
        <span class="col-span-4 text-center text-sm font-medium text-gray-800">
            {{ _texto }}
        </span>
    </button>


</template>
<script>
export default {
    data() {

    },
    props: {
        _texto: {
            type: String,
            default: "Botón"
        }
    }
}
</script>
<style lang="">

</style>