import { ref } from "vue"

/**
 * 空函数
 */
const noop = () => { }
/**
 * 空 payload 对象
 */
const emptyPayload = Object.create(null)

/**
 * 转换函数
 * @param {Function} api uniapp 的 api
 * @returns useApi
 */
export const $U = (api = noop) => {
    const useApi = (payload = emptyPayload) => {
        const result = ref(null)
        const loading = ref(true) // 加载状态，开始时为 true
        const error = ref(null)
        api({
            ...payload,
            success(r) {
                result.value = r
            },
            fail(e) {
                error.value = e
            },
            complete() {
                loading.value = false // 加载状态，结束时为 false
            }
        })
        return {
            result,
            loading,
            error
        }
    }
    return useApi
}