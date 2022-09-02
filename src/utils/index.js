import SparkMD5 from 'spark-md5'
const changeToBase64 = file => {
    return new Promise(resolve => {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = e => {
            resolve(e.target.result)
        }
    })
}
const getHashName = file=>{
    return new Promise(resolve=>{
        const fr = new FileReader()
        fr.readAsArrayBuffer(file)
        fr.onload = e=>{
            const buffer = e.target.result
            const spark = new SparkMD5.ArrayBuffer()
            spark.append(buffer);
            let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
            let HASH = spark.end();
            resolve({
                buffer,
                HASH,
                suffix,
                filename:`${HASH}.${suffix}`
            })
        }
    })
}
export{changeToBase64,getHashName}