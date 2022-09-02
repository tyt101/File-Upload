<template>
  <div>
    <!-- formData格式上传单个文件 -->
    <UploadSingle />
    <!-- 以BASE64格式上传文件 -->
    <UploadBASE64 />
    <!-- 前端生产Hash名上传文件 -->
    <UploadHashName />
  </div>
</template>

<script setup>
import UploadSingle from '@/components/UploadSingle.vue';
import UploadBASE64 from '@/components/UploadBASE64.vue';
import UploadHashName from './components/UploadHashName.vue';
</script>
 <script>
 export default {
   name: "App",
 }
 </script>