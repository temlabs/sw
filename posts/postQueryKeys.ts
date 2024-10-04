import { User } from "@/user/types"

const ALL = ['all']
const BY_USER = ['byUser']
const FROM_FOLLOWED_USERS = ['fromFollowedUsers']

export const postQueryKeys = {
  shortPosts: {
    all: ALL,
    byUser: (userId: User['id']) => [...ALL, ...BY_USER, userId],
    fromFollowedUsers: (authenticatedUserId: User['id']) => [...ALL, ...FROM_FOLLOWED_USERS, authenticatedUserId]
  }
} as const 