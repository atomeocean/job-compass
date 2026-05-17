<!-- 描述组件用于展示求职中介公司信息 -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { OfficeBuilding } from '@element-plus/icons-vue';

type BasicInformation = Record<string, unknown>;
type LinkType = 'website' | 'email' | 'phone';
type TagType = 'primary' | 'success' | 'info' | 'warning' | 'danger';
type PresentationType = 'text' | 'tag';

interface LegacyRecruiter {
  [key: string]: unknown;
}

interface LegacyStaffingCompanyData {
  basicInformation?: BasicInformation;
  recruiters?: LegacyRecruiter[];
}

interface FieldDefinition {
  label: string;
  aliases: string[];
  presentation?: PresentationType;
  tagType?: TagType;
  linkType?: LinkType;
}

interface DisplayLink {
  href: string;
  external?: boolean;
}

interface DisplayItem {
  id: string;
  label: string;
  displayValue: string;
  isEmpty: boolean;
  presentation: PresentationType;
  tagType: TagType;
  link?: DisplayLink;
}

const EMPTY_TEXT = '暂无信息';

const props = defineProps({
  staffingCompanyJsonPath: {
    type: String,
    required: true,
  },
});

const fieldDefinitions: FieldDefinition[] = [
  {
    label: '公司名称',
    aliases: ['公司名称', 'companyName'],
  },
  {
    label: '成立时间',
    aliases: ['成立时间', 'foundedDate', 'foundedYear'],
  },
  {
    label: '公司电话',
    aliases: ['公司电话', 'companyPhone', 'phone'],
    linkType: 'phone',
  },
  {
    label: '公司邮箱',
    aliases: ['公司邮箱', 'companyEmail', 'email'],
    linkType: 'email',
  },
  {
    label: '公司地址',
    aliases: ['公司地址', 'companyAddress', 'location'],
  },
  {
    label: '公司官网',
    aliases: ['公司官网', 'companyWebsite', 'website'],
    linkType: 'website',
  },
  {
    label: '运输岗位',
    aliases: ['运输岗位', 'jobType'],
    presentation: 'tag',
    tagType: 'primary',
  },
  {
    label: '行业领域',
    aliases: ['行业领域', 'industry'],
    presentation: 'tag',
    tagType: 'info',
  },
  {
    label: '在美身份支持',
    aliases: ['在美身份支持', 'usVisaSupport', 'usIdentitySupport'],
    presentation: 'tag',
    tagType: 'success',
  },
  {
    label: '工资单支持',
    aliases: ['工资单支持', 'payrollSupport', 'payStubSupport'],
    presentation: 'tag',
    tagType: 'warning',
  },
  {
    label: '招聘流程',
    aliases: ['招聘流程', 'recruitmentProcess'],
  },
];

const knownAliases = new Set(fieldDefinitions.flatMap((field) => field.aliases));
const staffingCompanyData = ref<LegacyStaffingCompanyData | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');
let loadVersion = 0;

const jsonModules = import.meta.glob<{ default: LegacyStaffingCompanyData }>(
  '/assets/json/staffing-company/*.json',
);

const basicInformation = computed(() => staffingCompanyData.value?.basicInformation ?? {});
const hasRawInformation = computed(() => Object.keys(basicInformation.value).length > 0);

const displayItems = computed<DisplayItem[]>(() => {
  if (!hasRawInformation.value) {
    return [];
  }

  const info = basicInformation.value;
  const orderedItems = fieldDefinitions.map((definition) => {
    const matched = findMatchedValue(info, definition.aliases);

    return createDisplayItem({
      id: definition.aliases[0],
      label: definition.label,
      rawValue: matched?.value,
      presentation: definition.presentation,
      tagType: definition.tagType,
      linkType: definition.linkType,
    });
  });

  const extraItems = Object.entries(info)
    .filter(([key]) => !knownAliases.has(key))
    .map(([key, value]) =>
      createDisplayItem({
        id: key,
        label: key,
        rawValue: value,
      }),
    );

  return [...orderedItems, ...extraItems];
});

async function loadStaffingCompanyInfo(path: string) {
  const currentLoad = ++loadVersion;
  const normalizedPath = normalizeJsonFileName(path);
  const fileKey = `/assets/json/staffing-company/${normalizedPath}`;
  const loadJson = jsonModules[fileKey];

  isLoading.value = true;
  errorMessage.value = '';
  staffingCompanyData.value = null;

  if (!loadJson) {
    if (currentLoad === loadVersion) {
      errorMessage.value = `未找到对应 JSON 文件：${normalizedPath}`;
      isLoading.value = false;
    }
    console.warn(`[StaffingCompanyInfo] 未找到对应 JSON 文件: ${fileKey}`);
    return;
  }

  try {
    const module = await loadJson();

    if (currentLoad === loadVersion) {
      staffingCompanyData.value = module.default;
    }
  } catch (error) {
    if (currentLoad === loadVersion) {
      errorMessage.value = `加载公司信息失败：${normalizedPath}`;
    }
    console.error(`[StaffingCompanyInfo] 加载 JSON 文件失败: ${fileKey}`, error);
  } finally {
    if (currentLoad === loadVersion) {
      isLoading.value = false;
    }
  }
}

function normalizeJsonFileName(path: string) {
  const trimmedPath = path.trim();

  return trimmedPath.endsWith('.json') ? trimmedPath : `${trimmedPath}.json`;
}

function findMatchedValue(info: BasicInformation, aliases: string[]) {
  const matchedKey = aliases.find((alias) => Object.prototype.hasOwnProperty.call(info, alias));

  if (!matchedKey) {
    return undefined;
  }

  return {
    key: matchedKey,
    value: info[matchedKey],
  };
}

function createDisplayItem({
  id,
  label,
  rawValue,
  presentation = 'text',
  tagType = 'info',
  linkType,
}: {
  id: string;
  label: string;
  rawValue: unknown;
  presentation?: PresentationType;
  tagType?: TagType;
  linkType?: LinkType;
}): DisplayItem {
  const value = normalizeValue(rawValue);
  const isEmpty = value.length === 0;
  const displayValue = isEmpty ? EMPTY_TEXT : value;

  return {
    id,
    label,
    displayValue,
    isEmpty,
    presentation,
    tagType,
    link: isEmpty || !linkType ? undefined : createLink(value, linkType),
  };
}

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue).filter(Boolean).join('、');
  }

  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).map(normalizeValue).filter(Boolean).join('，');
  }

  return String(value).trim();
}

function createLink(value: string, linkType: LinkType): DisplayLink | undefined {
  if (linkType === 'website' && /^https?:\/\//i.test(value)) {
    return {
      href: value,
      external: true,
    };
  }

  if (linkType === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return {
      href: `mailto:${value}`,
    };
  }

  if (linkType === 'phone') {
    const phoneNumber = value.replace(/[^\d+]/g, '');

    if (/^\+?\d{5,}$/.test(phoneNumber)) {
      return {
        href: `tel:${phoneNumber}`,
      };
    }
  }

  return undefined;
}

watch(
  () => props.staffingCompanyJsonPath,
  (path) => {
    void loadStaffingCompanyInfo(path);
  },
  { immediate: true },
);
</script>

<template>
  <el-card class="staffing-company-info" shadow="never">
    <template #header>
      <el-space class="staffing-company-info__header" :size="8">
        <el-icon class="staffing-company-info__header-icon">
          <OfficeBuilding />
        </el-icon>
        <el-text tag="span" class="staffing-company-info__title">公司信息</el-text>
      </el-space>
    </template>

    <el-skeleton v-if="isLoading" animated :rows="6" />

    <el-alert
      v-else-if="errorMessage"
      class="staffing-company-info__alert"
      type="warning"
      :title="errorMessage"
      show-icon
      :closable="false"
    />

    <el-empty v-else-if="!displayItems.length" description="暂无公司信息" :image-size="80" />

    <el-descriptions
      v-else
      class="staffing-company-info__descriptions"
      border
      :column="1"
    >
      <el-descriptions-item
        v-for="item in displayItems"
        :key="item.id"
        :label="item.label"
      >
        <el-link
          v-if="item.link"
          class="staffing-company-info__link"
          type="primary"
          :href="item.link.href"
          :target="item.link.external ? '_blank' : undefined"
          :rel="item.link.external ? 'noopener noreferrer' : undefined"
        >
          {{ item.displayValue }}
        </el-link>

        <el-tag
          v-else-if="item.presentation === 'tag' && !item.isEmpty"
          class="staffing-company-info__tag"
          :type="item.tagType"
          effect="plain"
          round
        >
          {{ item.displayValue }}
        </el-tag>

        <el-text
          v-else
          tag="span"
          class="staffing-company-info__value"
          :class="{ 'staffing-company-info__value--empty': item.isEmpty }"
          :type="item.isEmpty ? 'info' : undefined"
        >
          {{ item.displayValue }}
        </el-text>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style scoped lang="scss">
.staffing-company-info {
  --el-card-border-color: var(--el-border-color-light);
  --el-card-padding: 16px;

  margin: 20px 0;
  border-radius: 8px;

  :deep(.el-card__header) {
    padding: 14px 16px;
    background: var(--el-fill-color-lighter);
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__header-icon {
    color: var(--el-color-primary);
    font-size: 18px;
  }

  &__title {
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: 600;
  }

  &__descriptions {
    --el-descriptions-table-border: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-descriptions__label) {
    width: 132px;
    color: var(--el-text-color-regular);
    font-weight: 500;
    background: var(--el-fill-color-light);
  }

  :deep(.el-descriptions__content) {
    color: var(--el-text-color-primary);
    line-height: 1.7;
    word-break: break-word;
  }

  &__value {
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;

    &--empty {
      font-style: italic;
    }
  }

  &__tag {
    max-width: 100%;
    height: auto;
    padding: 4px 8px;
    line-height: 1.4;
    white-space: normal;
  }

  &__link {
    overflow-wrap: anywhere;
  }
}

@media (max-width: 640px) {
  .staffing-company-info {
    --el-card-padding: 12px;

    :deep(.el-card__header) {
      padding: 12px;
    }

    :deep(.el-descriptions__label) {
      width: 96px;
      padding: 10px;
    }

    :deep(.el-descriptions__content) {
      padding: 10px;
    }
  }
}
</style>
