import { api } from './index'
import type { User } from '@/types/user.management.types'

export interface BackendUser {
  id_user: number;
  uuid: string;
  username: string;
  nama_user: string;
  jabatan_user: string;
  pangkat?: string;
  golongan?: string;
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
        return response.data.data.map((u: BackendUser) => ({
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

  getRawUsers: async (): Promise<BackendUser[]> => {
    try {
      const response = await api.get<UserListResponse>('/ndi/user/daftar-pengguna')
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data
      }
      return []
    } catch (error) {
      console.error('Failed to fetch raw users from API:', error)
      return []
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

  updateProfile: async (data: { nama_user: string; jabatan_user: string; uuid?: string }) => {
    const response = await api.put('/ndi/user/update-profile', {
      nama_user: data.nama_user,
      jabatan_user: data.jabatan_user,
      uuid: data.uuid || '2379471e-afc6-415e-8477-e35172191baa',
      updated_by: 1,
    })
    return response.data
  },

  updatePassword: async (data: { password_lama: string; password_baru: string; konfirmasi_password: string; uuid?: string }) => {
    const response = await api.put('/ndi/user/update-password', {
      password_lama: data.password_lama,
      password_baru: data.password_baru,
      konfirmasi_password: data.konfirmasi_password,
      uuid: data.uuid || '2379471e-afc6-415e-8477-e35172191baa',
      updated_by: 1,
    })
    return response.data
  },
}
