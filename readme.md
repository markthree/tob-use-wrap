# tob-hook-wrap

可以将通用的 `uniapp-api` 转换为 `composition-api` 的工具

<br />
<br />

## 动机 🐗

在开发过程中，`uniapp-api` 的回调形式在 `vue3` 可以用更加简洁的方式来表达，同时赋予更灵活的操作。


<br />
<br />

## 规则 🦕

只要需要 `success`, `fail`, `complete` 的 `uniapp-api` 就可以转换为更简单的 `composition-api`。

- `success` 的结果会被设置到 `result.value`  
- `fail` 的结果会被设置到 `error.value`
- 函数的执行加载状态将被设置到 `loading.vue` 

例如 `uni.request`
```js
// 原生
uni.request({
    url: '...',
    data: {
        name: '张三',
        age: 18
    },
    success(data) {
        console.log(data) // 数据
    },
    fail(error) {
        console.log(error) // 错误
    },
    complete() {
        console.log(false) // loading 结束
    }
})

// 现在
const { result, error, loading } = useRequest({
    url: '...',
    data: {
        name: '张三',
        age: 18
    }
})
```

<br />
<br />

## 例子 🐸

### 1. useRequest

```js
// composables/request.js
import { watch } from "vue"
import { $U } from "@/uni_modules/tob-use-wrap/index.js"

export const useRequest = $U(uni.request)
``` 

```html
<!-- 页面中 -->
<template>
    <view>
       <view>数据结果: {{result}}</view>
       <view>加载状态: {{loading}}</view>
       <view>错误信息: {{error}}</view>
    </view>
</template>

<script>
import { useRequest } from "@/composables/request.js"
export default {
    setup() {
        const { result, loading, error } = useRequest({
            url: '...',
            data: {
                age: 18,
                name: '张三'
            }
        })

        return {
            result, // 数据结果
            error, // 错误信息
            loading // 加载状态
        }
    }
}
</script>
```

<br />

### 2. useUploadFile

```js
// composables/uploadFile.js
import { watch } from "vue"
import { $U } from "@/uni_modules/tob-use-wrap/index.js"

export const useUploadFile = $U(uni.uploadFile)
``` 

```html
<!-- 页面中 -->
<template>
    <view>
       <view>上传结果: {{result}}</view>
       <view>加载状态: {{loading}}</view>
       <view>错误信息: {{error}}</view>
    </view>
</template>

<script>
import { useUploadFile } from "@/composables/uploadFile.js"
export default {
    setup() {
        const { result, loading, error } = useUploadFile({
            url: '...',
            filePath: '...'
        })

        return {
            result, // 上传结果
            error, // 错误信息
            loading // 加载状态
        }
    }
}
</script>
```

<br />
<br />

## 组织 🦔

欢迎关注 **帝莎编程**
- [官网](http://dishaxy.dishait.cn/)
- [Gitee](https://gitee.com/dishait)

- [Github](https://github.com/dishait)

- [网易云课堂](https://study.163.com/provider/480000001892585/index.htm?share=2&shareId=480000001892585)

<br />
<br />


## License

Made with markthree

Published under [MIT License](./LICENSE).

<br />