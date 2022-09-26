import React, { useContext } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Platform, RefreshControl, ScrollView, Share, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import dynamicStyles from './styles';
import PostAnswer from './PostAnswer';
import { showErrorNotification } from '../../utils/toast';
import { fetchPostThunk } from '../../redux/thunks/posts';
import { AppTitle, Comment, HeaderTitle, Loader, ShareButton } from '../../components';
import buildLink from '../../utils/buildLink';
import { LocalizationContext } from '../../localization';
import { FilesList } from '../../components/FilePicker/FilePicker';

const Post = (props) => {
  const { t } = useContext(LocalizationContext);

  const dispatch = useDispatch();
  const colorSchema = useColorScheme();
  const navigation = useNavigation();
  const styles = dynamicStyles(colorSchema);
  const postId = props.route.params.postId;

  const [screenLoading, setScreenLoading] = React.useState(null);
  const [post, setPost] = React.useState(null);
  const loading = useSelector((state) => state.posts.postLoading);

  const fetchPost = () => {
    return dispatch(fetchPostThunk(postId)).then((response) => {
      if (response.success && response.data) {
        setPost(response.data);
      } else {
        showErrorNotification(t('Something went wrong!'), t('Please try again later'));
        navigation.navigate('HomeScreen');
      }
    });
  };

  React.useEffect(() => {
    if (postId) {
      setScreenLoading(true);
      fetchPost().then(() => setScreenLoading(false));
    } else {
      navigation.navigate('HomeScreen');
    }
  }, [postId]);

  const handleShare = React.useCallback(() => {
    buildLink({ postId }).then((link) => {
      Share.share({
        message: link,
      });
    });
  }, []);

  React.useEffect(() => {
    if (post) {
      navigation.setOptions({
        headerTitle: () => <HeaderTitle title={post.createdBy} />,
        headerRight: () => <ShareButton onPress={handleShare} />,
      });
    }
  }, [post]);

  const renderComment = (item, index) => {
    return <Comment item={item} key={index} />;
  };

  const renderCategory = (item) => {
    return (
      <View style={styles.categoryNameContainer}>
        <Text style={styles.categoryName}>
          {item}
        </Text>
      </View>
    );
  };

  if (screenLoading || !post) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tenderHeaderContainer}>
        <Text style={styles.userText}>
          {t('Answers')}: {post.comments?.length}
        </Text>
        <Text style={styles.userText}>
          {moment(post.createdAt).format('DD.MM.YYYY')}
        </Text>
      </View>
      <KeyboardAwareScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPost} />}
        keyboardShouldPersistTaps={'handled'} style={styles.body}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 40 : 0 }}>
        <Text style={styles.postTitle} selectable>{post.title}</Text>
        {!!post.text.length && (
          <Text style={styles.text} selectable>{post.text}</Text>
        )}
        {!!post?.files?.length && (
          <>
            <AppTitle>Файли 📁</AppTitle>
            <FilesList files={post.files} />
          </>
        )}
        {!!post.categories.length && (
          <View style={styles.categories}>
            {post.categories.map(renderCategory)}
          </View>
        )}
        {!!post.comments?.length && (
          <View style={styles.answersContainer}>
            <AppTitle style={styles.title}>Ответы</AppTitle>
            {post.comments.map(renderComment)}
          </View>
        )}
        <PostAnswer postId={post.id} setPost={setPost} post={post} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Post;
