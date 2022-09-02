<template>
    <div class="upload-break">
        <Upload action="/" :before-upload="handleUpload">
            <Button>大文件上传及断点续传</Button>
        </Upload>
    </div>
</template>

<script setup>
import { getHashName } from '@/utils';
import instance from '@/instance';
import { Message } from 'view-ui-plus';
import { reactive, ref } from '@vue/reactivity';


const handleUpload = async file => {

    const { HASH, suffix } = await getHashName(file)

    let max = ref(1024 * 100)
    let count = ref(Math.ceil(file.size / max.value))
    let index = ref(0)
    let already = reactive([])                                //已经上传的
    let chunks = reactive([])                                 //切片块
    let i = ref(0);
    if (count.value > 100) {
        max.value = file.size / 100
        count.value = 100
    }
    console.log(count.value)
    // 判断切片是否上传完成
    const completed = async () => {
        i.value++
        if (i.value < count.value) return
        try {
            console.log(count.value)
            await instance.post('/upload_merge', {
                HASH,
                count: count.value
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(data => {
                if (+data.code) {
                    Message.succuss("上传成功")
                }
            }).catch((e) => { throw new Error(e) })
        } catch (e) {
            console.log(e)
        }
    }


    // 获取已经上传的切片信息
    try {
        const data = await instance.get('/upload_already', {
            params: {
                HASH
            }
        });
        if (+data.code === 0) {
            already.value = data.fileList;
        }
    } catch (err) { console.log(err) }

    while (index.value < count.value) {
        chunks.push({
            file: file.slice(index.value * max.value, (index.value + 1) * max.value),
            filename: `${HASH}_${index.value}.${suffix}`
        })
        index.value++
    }
    //将切片上传
    chunks.forEach(async chunk => {

        if (already.includes(chunk.filename) && already.length > 0) {
            completed()
            return;
        }
        const formData = new FormData()
        formData.append('file', chunk.file)
        formData.append('filename', chunk.filename)
        await instance.post('/upload_chunk', formData).then(data => {
            if (+data.code === 0) {
                completed()
                return
            }
            return Promise.reject('上传失败')
        }).catch(err => {
            Message.error(err)
        })
    })
}
</script>
<script>
export default {
    name: 'UploadBreak'
}
</script>