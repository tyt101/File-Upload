<template>
    <div class="upload-hash-name">
        <Upload action="/" :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">Upload file exclude hash name</Button>
        </Upload>
        <Button @click="handlePreview">预览图片</Button>
        <Modal v-model="previewVisible" v-if="HASH">
            <img :src="HASH" alt="">
        </Modal>
    </div>
</template>
<script setup>
import { getHashName, changeToBase64 } from '@/utils';
import instance from '@/instance';
import { Message } from 'view-ui-plus';
import { reactive, ref } from '@vue/reactivity';
let previewVisible = ref(false)
let previewFile = reactive({})
let HASH = ref('')
const handleUpload = async file => {
    previewFile.value = file
    console.log(previewFile.value)
    const { filename } = await getHashName(file)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', filename)
    await instance.post('/upload_single_name', formData).then(data => {

        if (+data.code === 0) {
            Message.success("上传成功")
            return;
        }
        throw new Error(data.codeText)
    }).catch(e => {
        Message.error(e)
    })

}
const handlePreview = async () => {
    if (!previewFile.value) {
        Message.error("请先上传图片")
        return
    }
    HASH.value = await changeToBase64(previewFile.value)
    previewVisible.value = true
}

</script>
<script>
export default {
    name: 'UploadHashName'
}
</script>

<style lang="less" scoped>
.upload-hash-name {
    &-preview {
        width: 100px;
        height: 100px;

        img {
            object-fit: cover;
        }
    }
}
</style>