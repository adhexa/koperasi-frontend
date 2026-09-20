import { api } from './index'
import type { User } from '@/types/user.management.types'

export interface BackendUser {
  id_user: number;
  uuid: string;
  username: string;
  nama_user: string;
  jabatan_user: string;
  nip_users: string;
  status_user: boolean;
  id_level: number;
  nama_level?: string;
}

export interface UserListResponse {
  status_code: number;
  status: boolean;
  message: string;
  data: BackendUser[];
}

export const usersAPI = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<UserListResponse>('/ndi/user/daftar-pengguna')
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map((u) => ({
          id: String(u.id_user || u.uuid),
          nip: u.nip_users || '-',
          username: u.username,
          nama: u.nama_user,
          jabatan: u.jabatan_user || u.nama_level || 'User',
          status: u.status_user ? 'active' : 'inactive',
        }))
      }
      return []
    } catch (error) {
      console.error('Failed to fetch users from API:', error)
      throw error
    }
  },

  addUser: async (userData: any) => {
    const response = await api.post('/ndi/user/tambah-pengguna', userData)
    return response.data
  },

  updateStatus: async (uuid: string, status: boolean) => {
    const response = await api.put('/ndi/user/update-status', {
      uuid,
      status_user: status,
    })
    return response.data
  },
}
