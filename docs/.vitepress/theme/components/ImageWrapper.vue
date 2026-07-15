<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useData } from 'vitepress'
import {
  ElButton,
  ElIcon,
  ElImage,
  ElSkeleton,
  ElSkeletonItem,
} from 'element-plus'
import { PictureFilled, RefreshRight } from '@element-plus/icons-vue'

defineOptions({ inheritAttrs: false })

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
  preview: {
    type: Boolean,
    default: true, // 是否启用点击预览（lightbox）
  },
  caption: {
    type: String,
    default: '', // 可选图注，显示在图片下方
  },
  // 注意：不要声明 width prop —— unlazy 插件会给本地图片输出 width="原始像素宽"，
  // 声明后会被当作 prop 捕获并撑破 max-width 上限；宽度请用 style="width:…" 透传
})

// 用于透传其他属性（例如nolebase插件生成的 blurhash、loading 等）
const attrs = useAttrs()

const { lang } = useData()
const isZh = computed(() => !lang.value?.toLowerCase().startsWith('en'))
const errorText = computed(() => (isZh.value ? '图片加载失败' : 'Failed to load image'))
const retryText = computed(() => (isZh.value ? '重新加载' : 'Retry'))
const previewAriaLabel = computed(() => {
  const view = isZh.value ? '查看大图' : 'View full-size image'
  return props.alt ? `${view}: ${props.alt}` : view
})

// 加载自定义样式和默认样式
const computedClass = computed(() => [
  'default-image-class',
  props.customClass,
  { 'is-previewable': props.preview },
])

const previewList = computed(() =>
  props.preview && props.src ? [props.src] : [],
)

// 加载失败后点击“重新加载”：通过 key 重建 el-image 触发重新请求
const retryCount = ref(0)
const retry = () => {
  retryCount.value += 1
}

// 键盘（Enter/Space）打开预览。事件在 el-image 根节点上监听（内部 img 冒泡上来），
// 需放行错误态“重新加载”按钮等交互元素，否则 preventDefault 会吞掉按钮的键盘激活
const imageRef = ref<InstanceType<typeof ElImage>>()
const onKeydown = (event: KeyboardEvent) => {
  if (!props.preview) return
  if (event.key !== 'Enter' && event.key !== ' ') return
  const target = event.target as HTMLElement | null
  if (target?.closest('button, a')) return
  event.preventDefault()
  imageRef.value?.showPreview?.()
}
</script>

<template>
  <figure class="image-figure" :class="{ 'image-figure--bare': !caption }">
    <el-image
      ref="imageRef"
      :key="`${src}-${retryCount}`"
      :src="src"
      :alt="alt"
      :class="computedClass"
      :preview-src-list="previewList"
      :preview-teleported="true"
      :hide-on-click-modal="true"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      show-progress
      fit="contain"
      lazy
      :tabindex="preview ? 0 : undefined"
      :role="preview ? 'button' : undefined"
      :aria-label="preview ? previewAriaLabel : undefined"
      v-bind="attrs"
      @keydown="onKeydown"
    >
      <template #placeholder>
        <div class="image-state image-state--placeholder">
          <el-skeleton class="image-state__skeleton" animated>
            <template #template>
              <el-skeleton-item class="image-state__skeleton-item" variant="image" />
            </template>
          </el-skeleton>
        </div>
      </template>
      <template #error>
        <div class="image-state image-state--error">
          <el-icon :size="28"><PictureFilled /></el-icon>
          <span>{{ errorText }}</span>
          <el-button
            size="small"
            text
            bg
            :icon="RefreshRight"
            @click.stop="retry"
          >
            {{ retryText }}
          </el-button>
        </div>
      </template>
    </el-image>
    <figcaption v-if="caption" class="image-figure__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
$image-max-width: 400px;
$image-radius: 8px;
$shadow-rest: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.16);

.image-figure {
  margin: 16px 0;

  // 无图注时不引入额外盒模型，保持与旧版（el-image 为根节点）一致的布局
  &--bare {
    display: contents;
  }

  &__caption {
    margin-top: 10px;
    text-align: center;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-2, #909399);
  }
}

.default-image-class {
  position: relative;
  display: block;
  max-width: $image-max-width;
  margin: 0 auto;
  border-radius: $image-radius;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider, rgba(60, 60, 67, 0.12));
  box-shadow: $shadow-rest;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  :deep(img) {
    display: block;
    width: 100%;
    height: auto;
  }

  // el-image 的 placeholder 外层默认绝对定位，会脱离文档流导致加载期高度塌陷为 0，
  // 改回文档流让骨架屏占位、减少布局抖动
  :deep(.el-image__wrapper) {
    position: static;
  }

  // :where 保持与旧版相同的选择器权重，避免压过外部对 customClass 的覆写
  &:where(.is-previewable) {
    cursor: zoom-in;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-hover;
    }

    // el-image 会把 tabindex 转发到内部 img（根节点不可聚焦），
    // 故用 :has(:focus-visible) 在根节点上呈现焦点环；旧浏览器优雅降级
    &:has(:focus-visible) {
      outline: 2px solid var(--vp-c-brand-1, #3451b2);
      outline-offset: 2px;
    }

    // 悬停/聚焦时右下角显示放大镜角标，提示可点击预览
    &::after {
      content: '';
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background:
        rgba(0, 0, 0, 0.5)
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3Cpath d='M11 8v6M8 11h6'/%3E%3C/svg%3E")
        center / 16px no-repeat;
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }

    // 加载中/失败状态下不显示角标
    &:hover:not(:has(.image-state))::after,
    &:has(:focus-visible):not(:has(.image-state))::after {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:where(.is-previewable):hover {
      transform: none;
    }
  }
}

.image-state {
  // 站点未引入 Element Plus 暗色 CSS，这里用 VitePress 主题变量
  // 覆写骨架屏配色，保证明暗两种模式下观感一致
  --el-skeleton-color: var(--vp-c-default-soft, rgba(142, 150, 170, 0.14));
  --el-skeleton-to-color: var(--vp-c-default-2, rgba(142, 150, 170, 0.28));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 120px;
  background: var(--vp-c-bg-soft, #f5f7fa);
  color: var(--vp-c-text-2, #909399);
  font-size: 0.875rem;

  &--placeholder {
    gap: 0;
  }

  &--error {
    color: var(--vp-c-danger-1, #f56c6c);

    // 同理：text+bg 按钮的填充色跟随 VitePress 主题变量，适配暗色模式
    :deep(.el-button.is-text) {
      --el-fill-color-light: var(--vp-c-default-soft, #f2f3f5);
      --el-fill-color: var(--vp-c-default-2, #e5e6eb);
      --el-button-text-color: var(--vp-c-text-1, #303133);
      --el-button-hover-text-color: var(--vp-c-text-1, #303133);
    }
  }

  &__skeleton,
  &__skeleton-item {
    width: 100%;
    height: 100%;
  }
}
</style>
