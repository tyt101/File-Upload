<!-- 后端实现生产Hash名字 -->
<template>
    <div class="upload-multiple">
        <Upload action="/" :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">Upload file BASE64</Button>
        </Upload>
    </div>
</template>
<script setup>
import instance from '@/instance'
import { changeToBase64 } from '@/utils'
import { Message } from 'view-ui-plus'

const handleUpload = async file => {
    console.log(file)
    const BASE64 = await changeToBase64(file)
    try {
        const data = await instance.post('/upload_single_base64', {
            file: decodeURIComponent(BASE64),
            filename: file.name
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(data.code)
        if (+data.code === 0) {
            console.log("___")
            Message.succuss("上传成功")
            return
        }
        throw new Error(data.codeText)
    } catch (e) {
        Message.error(e.data)
    }
}
</script>
<script>
export default {
    name: 'UploadBASE64'
}
</script>

<style>
</style>