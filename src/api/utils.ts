import { useQueryClient } from '@tanstack/react-query'

type UseInvalidateCommonQueries = {
  resetQueries: () => Promise<void>
}

export function useInvalidateCommonQueries(): UseInvalidateCommonQueries {
  const queryClient = useQueryClient()

  const resetQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: ['user'] })
    await queryClient.invalidateQueries({ queryKey: ['goals', 'list'] })
    await queryClient.invalidateQueries({ queryKey: ['settings'] })
  }

  return { resetQueries }
}
