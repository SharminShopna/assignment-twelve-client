
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`)
      return data.role
    },
  })
  console.log(role)
  return [role, isLoading]
}

export default useRole