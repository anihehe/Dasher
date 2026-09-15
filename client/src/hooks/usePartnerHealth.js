import { useQuery } from '@tanstack/react-query'

export function usePartnerHealth() {
  return useQuery({
    queryKey: ['partner-health'],
    queryFn: () => fetch('/api/partner-health').then((res) => res.json()),
  })
}
