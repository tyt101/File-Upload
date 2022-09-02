<template>
  <div>
    <!-- formData格式上传单个文件 -->
    <UploadSingle />
    <!-- 以BASE64格式上传文件 -->
    <UploadBASE64 />
    <!-- 前端生产Hash名上传文件 -->
    <UploadHashName />
    <!-- 推拽上传,具体内容就不实现了。和前面三个一样的 -->
    <UploadByDrag />
    <!-- 大文件上传 -->
    <UploadBreakPoint />
  </div>
</template>

<script setup>
import UploadSingle from '@/components/UploadSingle.vue';
import UploadBASE64 from '@/components/UploadBASE64.vue';
import UploadHashName from './components/UploadHashName.vue';
import UploadByDrag from './components/UploadByDrag.vue';
import UploadBreakPoint from './components/UploadBreakPoint.vue';
</script>
 <script>
 export default {
   name: "App",
 }
 </script>