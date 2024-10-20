import { api } from "@/api/axios";
import {ref} from 'vue'

const page = ref<any>(null)

export function usePage() {
    const useGetPage = async (pages: string) => {
        try {
            const response = await api.get(`/page/post-${pages}.json`)
            page.value = response.data.acf
        } catch (error) {
            
        }
    }

    return {
        useGetPage,
        page
    }
}