import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query'
import { fetchShortPosts } from './functions'
import { postQueryKeys } from './postQueryKeys'
import { User } from '@/user/types';
import { OptimisticShortPost, ShortPost, ShortPostQueryKey } from './types';



export function useShortPostQuery(options:Omit<UseQueryOptions<(ShortPost)[], Error, (ShortPost|OptimisticShortPost)[], ShortPostQueryKey>, 'queryFn'>):UseQueryResult<(ShortPost|OptimisticShortPost)[], Error>{



    const shortPostQuery = useQuery({
        queryFn: ({queryKey}) => fetchShortPosts(queryKey),
        ...options,
    })

    return shortPostQuery
}