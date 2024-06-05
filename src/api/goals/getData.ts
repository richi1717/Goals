import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useGetUserDataQuery = (id: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DB_URL}/${id}.json`,
      )

      return data
    },
  })
}

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DB_URL}/users.json`,
      )

      return data
    },
  })
}
