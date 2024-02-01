import { apiGetUser } from '@/api/user'
import { TOKEN_KEY } from '@/enums/cacheEnums'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'

interface StaffSate {
    staffInfo: Record<string, any>
    token: string | null
    temToken: string | null
}

export const useStaffStore = defineStore({
    id: 'staffStore',
    state: (): StaffSate => ({
        staffInfo: {},
        token: cache.get(TOKEN_KEY) || null,
        temToken: null
    }),
    getters: {
        isLogin: (state) => {
			return !!state.token 
		} 
    },
    actions: {
        async getUser() {
            const { data } = await apiGetUser() as any
            this.staffInfo = data
        },
        login(token: string) {
            this.token = token
            cache.set(TOKEN_KEY, token)
        },
        logout() {
            this.token = ''
            this.staffInfo = {}
            cache.remove(TOKEN_KEY)
        }
    }
})
