import { useQuery } from '@tanstack/react-query'

export function useWeeklyTrends() {
  return useQuery({
    queryKey: ['weekly-trends'],
    queryFn: () => fetch('/api/weekly-trends').then((res) => res.json()),
  })
}
