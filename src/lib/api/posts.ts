import { api } from './index'
import type { Post } from './types'

export const postsAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts')
    return response.data
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`)
    return response.data
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await api.post<Post>('/posts', post)
    return response.data
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, post)
    return response.data
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`)
  },
}
