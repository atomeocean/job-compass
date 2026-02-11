<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '', // 用户可以传入自定义类
  },
});

// 加载自定义样式和默认样式
const computedClass = computed(() => {
  return props.customClass ? `${props.customClass} default-image-class` : 'default-image-class';
});
</script>

<template>
  <img :src="src" :alt="alt" :class="computedClass"/>
</template>

<style scoped>
.default-image-class {
  /* 添加默认样式 */
  max-width: 400px;
  border-radius: 8px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.default-image-class:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>