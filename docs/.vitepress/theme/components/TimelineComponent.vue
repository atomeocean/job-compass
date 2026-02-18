<!--全局注册element plus中的时间线组件-->
<script setup lang="ts">
import { PropType } from 'vue';

// 时间线上每个时间点显示的内容
// api参考 https://element-plus.org/zh-CN/component/timeline.html
interface Activity {
  title: string;
  content: string;
  timestamp: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  hollow?: boolean;
  size?: 'large' | 'medium' | 'small';
  icon?: string;
  color?: string;
}

// 定义组件的 props
defineProps({
  activities: {
    type: [] as PropType<Activity[]>,
    required: true,
    // 定义默认值
    default: () => [
      {
        content: 'Event start',
        timestamp: '2018-04-15',
      },
      {
        content: 'Approved',
        timestamp: '2018-04-13',
      },
      {
        content: 'Success',
        timestamp: '2018-04-11',
      },
    ],
  },
});


</script>

<template>
  <el-timeline style="max-width: 600px">
    <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>


