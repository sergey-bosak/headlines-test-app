import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {formatDate} from '../../utils/formatDate';

import {styles} from './ItemCard.styles';

const ItemCard: React.FC = ({item}) => {
  const navigation = useNavigation();
  const noImageIcon =
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

  const handleNavigate = useCallback(() => {
    navigation.navigate('Headline', {item});
  }, []);

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.flatlistCard}>
      <Text numberOfLines={2} style={styles.flatlistCardTitle}>
        {item.title}
      </Text>
      <Text>{formatDate(item.publishedAt)}</Text>
      <Image
        source={{uri: item.urlToImage ?? noImageIcon}}
        resizeMode="contain"
        style={styles.flatlistCardImage}
      />
      <Text>
        {item?.description?.length < 80
          ? `${item?.description}`
          : `${item?.description?.substring(0, 80)}...`}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ItemCard);
