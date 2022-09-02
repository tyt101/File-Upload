<template>
    <div class="upload">
        <Upload action="/" :before-upload="handleUpload" :on-progress="handleProgress" :show-upload-list="false"
            :on-preview="handlePreview">
            <Button icon="ios-cloud-upload-outline">Upload file</Button>
        </Upload>
        <!-- 显示进度条 -->
        <div class="upload-progress">
            <div class="upload-progress-show"></div>
        </div>
        <div class="upload-list">
            <List>
                <ListItem v-for="(file, index) in fileContainer" :key="file.uid" @click="handleLink(file.servicePath)">
                    {{ index + ':' + file.servicePath }}
                </ListItem>
            </List>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from '@vue/reactivity'
import instance from '@/instance'
let fileContainer = reactive([])
let progress = ref('0px')
const handleUpload = (file) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('filename', file.name)
    instance.post('/upload_single', formData).then(data => {
        console.log("上传成功")
        fileContainer.push(data)
        progress.value = '0px'
    })
}
const handleProgress = (e) => {
    progress.value = e.percent / 100 * 1000 + 'px'
}
const handleLink = (path) => {
    window.location = path;
}
</script>
<script>
export default {
    name: 'UploadSingle'
}
</script>

<style lang="less" scoped>
.upload {
    &-progress {
        width: 1000px;
        height: 10px;
        border: 1px solid #ccc;

        &-show {
            width: v-bind(progress);
            height: 10px;
            background-color: green;
        }
    }
}
</style>