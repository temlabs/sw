import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useShortPostQuery } from '@/posts/useShortPostQuery';
import { postQueryKeys } from '@/posts/postQueryKeys';
import { OptimisticShortPost, ShortPost } from '@/posts/types';
import { isOptimisticShortPost } from '@/posts/functions';
import { FeedShortPost } from '@/components/posts/FeedShortPost';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function HomeTab() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { data: shortPosts } = useShortPostQuery({
    queryKey: postQueryKeys.shortPosts.all,
  });
  const insets = useSafeAreaInsets();

  const renderItem: ListRenderItem<ShortPost | OptimisticShortPost> = info => {
    const post = info.item;
    const isOptimistic = isOptimisticShortPost(post);
    if (!isOptimistic) {
      return <FeedShortPost {...post} />;
    } else {
      return null;
    }
  };

  return (
    <View style={{ ...container, paddingTop: insets.top }}>
      <FlashList
        data={shortPosts}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={
          <View style={{ height: bottomTabBarHeight, width: '100%' }} />
        }
        estimatedItemSize={30}
      />
    </View>
  );
}

const container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};
