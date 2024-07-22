import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';

interface RepositoryListProps {
  data: any[];
}

interface Repository {
  name: string;
  created_at: string;
  watchers: number;
  language: string;
  html_url: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({data}) => {
  const showDetailAlert = (item: Repository) => {
    alert(
      `Name: ${item.name}\nCreated At: ${item.created_at}\nWatchers: ${item.watchers}\nLanguage: ${item.language}`,
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.avatarContainer}>
            <Avatar.Image source={{uri: item.owner.avatar_url}} />
          </View>
          <TouchableOpacity
            onPress={() => showDetailAlert(item)}
            style={styles.textInfoContainer}>
            <Text style={styles.textInfo}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  avatarContainer: {
    margin: 10,
  },
  textInfoContainer: {
    flex: 1,
  },
  textInfo: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: 'bold',
  },
});

export default RepositoryList;
