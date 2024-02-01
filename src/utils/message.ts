export const useMessage = () => {
    return {
        toast: (title: string) => {
            uni.showToast({
                title: title,
                icon: 'none'
            })
        },
        success: (title: string) => {
            uni.showToast({
                title: title,
                icon: "success"
            })
        },
        error: (title: string) => {
            uni.showToast({
                title: title,
                icon: "error"
            })
        },
        loading: (title: string) => {
            uni.showLoading({
                title: title,
                mask: true,
            })
        },
        hideLoading: () => {
            uni.hideLoading()
        }
    }
}