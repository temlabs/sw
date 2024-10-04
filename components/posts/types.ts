export interface ShortPost {
  id: number;
  userId: number;
  name: string;
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
  username: string;
  avatarUrl: string;
  displayName: string;
}
