import { useQuery } from '@tanstack/react-query'

export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: () => fetch('/api/cases').then((res) => res.json()),
    refetchInterval: 5 * 60 * 1000,
  })
}
