import { makeRequest } from '@/api/apiUtils';
import { User } from '@/user/types';
import { OptimisticShortPost, ShortPost, ShortPostQueryKey } from './types';
import { postQueryKeys } from './postQueryKeys';

function extractParamsFromQueryKey(queryKey: ShortPostQueryKey): {
  created_by_user?: User['id'];
} {
  const byUserIndex = queryKey.findIndex(v => v === 'byUser');
  const fromFollowedUsersIndex = queryKey.findIndex(
    v => v === 'fromFollowedUsers',
  );
  const isLast = (index: number) => queryKey.length === index;
  if (byUserIndex > -1 && !isLast(byUserIndex)) {
    return { created_by_user: parseInt(queryKey[byUserIndex + 1].toString()) };
  } else if (fromFollowedUsersIndex > -1) {
    return {};
  } else {
    return {};
  }
}

export const fetchShortPosts = async (
  queryKeys: ShortPostQueryKey,
): Promise<ShortPost[]> => {
  const queryParams = extractParamsFromQueryKey(queryKeys);
  const resJson = await makeRequest<Array<ShortPost>>('GET', 'shortPost', {
    isAuthenticated: true,
    queryParams,
  });
  return resJson;
};

export const isoDateToFeedDate = (createdAt: Date) => {
  const dateObj = new Date(createdAt);
  return dateObj.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    // year: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',

    // hour12: true
  });
};

export const isOptimisticShortPost = (
  post: OptimisticShortPost | ShortPost,
): post is OptimisticShortPost => {
  return 'extId' in post && !('id' in post);
};
