<template>
  <router-link :to="route" class="p-4 rounded-md flex flex-row justify-center sm:justify-start   items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-blue-200" >
    <i class="" :class="iconClass"></i>
    <span class="hidden lg:block line-clamp-1 overflow-ellipsis">{{ text }}</span>
  </router-link>

  
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: true
    },
    route: {
        type:String,
        required:true
    },
  },
  methods: {
   
  }
}
</script>
