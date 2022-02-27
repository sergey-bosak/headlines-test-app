import React from 'react';
import {View, Text, Image} from 'react-native';
import {formatDate} from '../../utils/formatDate';
import {styles} from './Headline.styles';

const Headline: React.FC = ({route}) => {
  const articleData = route.params.item;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{articleData.title}</Text>
      <Text>{formatDate(articleData.publishedAt)}</Text>
      <Text style={styles.author}>{articleData.author}</Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{uri: articleData.urlToImage}}
      />
      <Text>{articleData.content}</Text>
    </View>
  );
};

export {Headline};
