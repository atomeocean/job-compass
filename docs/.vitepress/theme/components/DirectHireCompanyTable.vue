<!-- 展示美国公司静态信息的组件 -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { formatAddress } from "@ao-utils/util";
import type { DirectHireCompany } from "@ao-types/directHireCompanyTypes";

interface Props {
  companyJsonFileName: string;
  state: string;
  city: string;
}

const props = defineProps<Props>();

const EMPTY_TEXT = "暂未提供";

const company = ref<DirectHireCompany | null>(null);
const loading = ref(false);
const errorMessage = ref("");

const jsonModules = import.meta.glob<DirectHireCompany>(
  "/zhHans/direct-hire-company/**/*.json",
  { import: "default" }
);

// 计算完整的文件路径
const filePath = computed(() => {
  const normalizedPath = props.companyJsonFileName.endsWith(".json")
    ? props.companyJsonFileName
    : `${props.companyJsonFileName}.json`;
  return `/zhHans/direct-hire-company/${props.state}/${props.city}/data/${normalizedPath}`;
});

const companyInfo = computed(() => company.value?.companyInfo);
const contact = computed(() => companyInfo.value?.contact);
const metadata = computed(() => company.value?.metadata);

const normalizeText = (value?: string) => value?.trim() || "";
const fallbackText = (value?: string, fallback = EMPTY_TEXT) => normalizeText(value) || fallback;
const normalizeTags = (items?: string[]) =>
  items?.map((item) => item.trim()).filter(Boolean) ?? [];

const companyName = computed(() => fallbackText(companyInfo.value?.companyName, "美国雇主信息"));
const fullAddress = computed(() => {
  const location = companyInfo.value?.location;
  return location ? formatAddress(location) : EMPTY_TEXT;
});
const locationLabel = computed(() => {
  const location = companyInfo.value?.location;
  return [normalizeText(location?.cityOrTown), normalizeText(location?.state)]
    .filter(Boolean)
    .join(", ");
});
const industries = computed(() => normalizeTags(companyInfo.value?.industry));
const productsOrServices = computed(() => normalizeTags(companyInfo.value?.mainProductsOrServices));

const phoneText = computed(() => normalizeText(contact.value?.phone));
const emailText = computed(() => normalizeText(contact.value?.email));
const websiteText = computed(() => normalizeText(contact.value?.website));
const linkedinText = computed(() => normalizeText(contact.value?.linkedin));

const normalizeExternalUrl = (value: string) => {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

const phoneHref = computed(() =>
  phoneText.value ? `tel:${phoneText.value.replace(/[^\d+]/g, "")}` : ""
);
const emailHref = computed(() => emailText.value ? `mailto:${emailText.value}` : "");
const websiteHref = computed(() => websiteText.value ? normalizeExternalUrl(websiteText.value) : "");
const linkedinHref = computed(() => linkedinText.value ? normalizeExternalUrl(linkedinText.value) : "");

const loadCompany = async () => {
  const fileKey = filePath.value;
  const loader = jsonModules[fileKey];

  company.value = null;
  errorMessage.value = "";

  if (!loader) {
    errorMessage.value = `未找到对应 JSON 文件：${fileKey}`;
    console.warn(`[DirectHireCompanyTable] ${errorMessage.value}`);
    return;
  }

  loading.value = true;

  try {
    company.value = await loader();
  } catch (error) {
    errorMessage.value = `公司信息加载失败：${fileKey}`;
    console.warn(`[DirectHireCompanyTable] ${errorMessage.value}`, error);
  } finally {
    loading.value = false;
  }
};

watch(filePath, loadCompany, { immediate: true });
</script>

<template>
  <div class="company-info">
    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="warning"
      show-icon
      :closable="false"
      class="state-card"
    />

    <el-skeleton
      v-else-if="loading"
      animated
      :rows="8"
      class="state-card"
    />

    <template v-else-if="company">
      <section class="company-summary">
        <p class="company-summary__eyebrow">美国直招雇主</p>
        <h2 class="company-summary__title">{{ companyName }}</h2>
        <el-space wrap class="company-summary__tags">
          <el-tag type="success" effect="light">美国雇主</el-tag>
          <el-tag type="primary" effect="light">直招公司</el-tag>
          <el-tag v-if="locationLabel" type="info" effect="light">{{ locationLabel }}</el-tag>
          <el-tag v-if="companyInfo?.companySize" type="warning" effect="light">
            {{ companyInfo.companySize }}
          </el-tag>
        </el-space>
      </section>

      <!-- 基本信息 -->
      <el-descriptions title="公司基本信息" :column="2" border class="section-card">
        <el-descriptions-item label="公司名称">
          {{ companyName }}
        </el-descriptions-item>
        <el-descriptions-item label="成立年份">
          {{ fallbackText(companyInfo?.foundedYear) }}
        </el-descriptions-item>
        <el-descriptions-item label="公司地址">
          {{ fullAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="公司规模">
          {{ fallbackText(companyInfo?.companySize) }}
        </el-descriptions-item>
        <el-descriptions-item label="公司简介" :span="2">
          <span class="description-text">{{ fallbackText(companyInfo?.description) }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 联系信息 -->
      <el-descriptions title="联系信息" :column="1" border class="section-card">
        <el-descriptions-item label="电话">
          <el-link v-if="phoneText" :href="phoneHref" type="primary" class="company-link">
            {{ phoneText }}
          </el-link>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-link v-if="emailText" :href="emailHref" type="primary" class="company-link">
            {{ emailText }}
          </el-link>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="官网">
          <el-link
            v-if="websiteText"
            :href="websiteHref"
            type="primary"
            target="_blank"
            rel="noopener noreferrer"
            class="company-link"
          >
            {{ websiteText }}
          </el-link>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="LinkedIn">
          <el-link
            v-if="linkedinText"
            :href="linkedinHref"
            type="primary"
            target="_blank"
            rel="noopener noreferrer"
            class="company-link"
          >
            {{ linkedinText }}
          </el-link>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 公司详情 -->
      <el-descriptions title="公司详情" :column="1" border class="section-card">
        <el-descriptions-item label="行业类别">
          <el-space v-if="industries.length" wrap>
            <el-tag v-for="item in industries" :key="item" type="success" effect="plain">
              {{ item }}
            </el-tag>
          </el-space>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="主要产品或服务">
          <el-space v-if="productsOrServices.length" wrap>
            <el-tag v-for="item in productsOrServices" :key="item" type="info" effect="plain">
              {{ item }}
            </el-tag>
          </el-space>
          <span v-else class="empty-text">{{ EMPTY_TEXT }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 元数据 -->
      <el-descriptions title="其他信息" :column="1" border class="section-card">
        <el-descriptions-item label="最后更新">
          {{ fallbackText(metadata?.lastUpdated) }}
        </el-descriptions-item>
      </el-descriptions>
    </template>

    <el-empty v-else description="暂无公司信息" class="state-card" />
  </div>
</template>

<style scoped lang="scss">
.company-info {
  max-width: 1000px;
  margin: 20px auto;
  color: var(--vp-c-text-1);

  .state-card,
  .company-summary,
  .section-card {
    margin-bottom: 20px;
  }

  .state-card,
  .company-summary {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
  }

  .state-card {
    padding: 16px;
  }

  .company-summary {
    padding: 18px 20px;

    &__eyebrow {
      margin: 0 0 6px;
      color: var(--vp-c-brand-1);
      font-size: 13px;
      font-weight: 600;
    }

    &__title {
      margin: 0 0 12px;
      color: var(--vp-c-text-1);
      font-size: 24px;
      line-height: 1.25;
      letter-spacing: 0;
    }

    &__tags {
      width: 100%;
    }
  }

  .section-card {
    overflow: hidden;
    border-radius: 8px;
    background: var(--vp-c-bg);
  }

  .el-descriptions {
    --el-descriptions-table-border: 1px solid var(--vp-c-divider);
  }

  :deep(.el-descriptions__header) {
    margin-bottom: 0;
  }

  :deep(.el-descriptions__title) {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--vp-c-divider);
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    font-size: 18px;
    font-weight: 600;
  }

  :deep(.el-descriptions__body) {
    background: var(--vp-c-bg);
  }

  :deep(.el-descriptions__label) {
    min-width: 112px;
    padding: 10px 14px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    font-weight: 500;
  }

  :deep(.el-descriptions__content) {
    padding: 10px 14px;
    color: var(--vp-c-text-2);
    line-height: 1.65;
    word-break: break-word;
  }

  .company-link {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .description-text {
    white-space: pre-line;
  }

  .empty-text {
    color: var(--vp-c-text-3);
    font-style: italic;
  }
}

@media (max-width: 640px) {
  .company-info {
    margin: 16px 0;

    .company-summary {
      padding: 16px;

      &__title {
        font-size: 22px;
      }
    }

    :deep(.el-descriptions__title) {
      font-size: 16px;
    }

    :deep(.el-descriptions__table),
    :deep(.el-descriptions__table tbody),
    :deep(.el-descriptions__table tr),
    :deep(.el-descriptions__table th),
    :deep(.el-descriptions__table td) {
      display: block;
      width: 100% !important;
    }

    :deep(.el-descriptions__label) {
      border-right: 0;
    }
  }
}
</style>
