import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {Chip} from 'react-native-paper';

import ItemCard from './ItemCard';

import {styles} from './Headlines.styles';

const Headlines: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const getNews = async () => {
    setLoading(true);
    try {
      const {data} = await axios({
        method: 'get',
        url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=585001fadd9d45c8af9d20ee37c4ce71&category=${category}&q=${searchText}&pageSize=${pageSize}`,
      });

      setArticles(data.articles);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    await getNews();
  }, [category, searchText, pageSize]);

  useEffect(() => {
    getNews();
  }, [category, searchText, pageSize]);

  const chipsCategories = [
    'business',
    'health',
    'general',
    'entertainment',
    'science',
    'sports',
    'technology',
  ];

  const RenderChips = useMemo(() => {
    return chipsCategories.map(chip => (
      <Chip onPress={() => setCategory(chip)} style={styles.chip}>
        {chip}
      </Chip>
    ));
  }, []);

  const handleSearch = useCallback(
    text => {
      setSearchText(text);
    },
    [searchText],
  );

  const RenderEmptyComponent = useMemo(
    () => (
      <View>
        <Text>No headlines</Text>
      </View>
    ),
    [],
  );

  const handleReachedEnd = useCallback(() => {
    if (pageSize < 100) {
      setPageSize(pageSize + 10);
    }
  }, [pageSize]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Search"
      />
      <View style={styles.chipsContainer}>{RenderChips}</View>
      <View>
        <FlatList
          initialNumToRender={10}
          refreshing={loading}
          onRefresh={handleRefresh}
          style={styles.flatlist}
          contentContainerStyle={styles.flatlistContentContainer}
          data={articles}
          keyExtractor={({urlToImage}) => urlToImage}
          renderItem={({item}) => <ItemCard item={item} />}
          ListEmptyComponent={RenderEmptyComponent}
          onEndReached={handleReachedEnd}
          onEndReachedThreshold={0.4}
        />
      </View>
    </View>
  );
};

export {Headlines};
