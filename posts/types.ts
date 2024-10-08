import { CreateTrackParams, Track } from '@/tracks/types';
import { User } from '@/user/types';
import { postQueryKeys } from './postQueryKeys';

export interface CreateShortPostBody {
  text: string;
  track: Track;
  timeIn: number;
  timeOut: number;
  extId: string;
}

export interface ShortPost {
  id: number;
  userId: User['id'];
  name: Track['name'];
  artwork: string;
  text: string;
  timeIn: number;
  timeOut: number;
  extId: string | null;
  createdAt: Date;
  spotifyId: string;
  saveCount: number;
  replyCount: number;
  upvoteCount: number;
  username: User['username'];
  avatarUrl: User['avatarUrl'];
  displayName: User['displayName'];
  artist: Track['artist'];
  duration: Track['duration'];
}

export interface OptimisticShortPost {
  userId: User['id'];
  text: string;
  track: CreateTrackParams;
  time_in: number;
  time_out: number;
  extId: string;
}

export type ShortPostQueryKey =
  | typeof postQueryKeys.shortPosts.all
  | ReturnType<typeof postQueryKeys.shortPosts.byUser>
  | ReturnType<typeof postQueryKeys.shortPosts.fromFollowedUsers>;
