<script setup>
defineProps({
  recruiterName: String,
  recruiterEmail: String,
  company: String,
  jobTitle: String,
  team: String,
  description: String,
  bookingLink: String,
  emailContent: String, // 邮件正文内容
});
</script>

<template>
  <el-card shadow="hover" class="job-card">
    <template #header>
      <div class="header">
        <span>{{ jobTitle }}</span>
        <el-tag type="success" size="small">{{ team }}</el-tag>
      </div>
    </template>

    <div class="content">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="公司">
          {{ company }}
        </el-descriptions-item>

        <el-descriptions-item label="招聘联系人">
          <el-link :href="`mailto:${recruiterEmail}`" type="primary">
            {{ recruiterName }} ({{ recruiterEmail }})
          </el-link>
        </el-descriptions-item>

        <el-descriptions-item label="预约面谈">
          <el-button type="success" plain :href="bookingLink" target="_blank">
            📅 点击预约时间
          </el-button>
        </el-descriptions-item>
      </el-descriptions>

      <el-collapse>
        <el-collapse-item title="✉️ 展开邮件详情" name="email">
          <el-scrollbar max-height="200px">
            <pre class="email-content">{{ emailContent }}</pre>
          </el-scrollbar>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>


<style scoped>
.job-card {
  max-width: 700px;
  margin: 20px auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25rem;
  font-weight: 600;
}

.content {
  color: #606266;
}

.email-content {
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: inherit;
  padding: 10px;
  margin: 0;
}
</style>