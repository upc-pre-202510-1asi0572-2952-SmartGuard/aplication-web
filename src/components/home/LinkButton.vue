<template>
  <router-link :to="route" class="p-4 rounded-md flex flex-row items-center gap-4 text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-blue-200" >
    <i :class="iconClass"></i>
    <span>{{ text }}</span>
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
