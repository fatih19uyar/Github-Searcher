import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';

interface UserListProps {
  data: any[];
}

interface User {
  login: string;
  id: number;
  type: string;
  score: number;
  avatar_url: string;
  html_url: string;
}

const UserList: React.FC<UserListProps> = ({data}) => {
  const showDetailAlert = (item: User) => {
    alert(
      `Login: ${item.login}\nID: ${item.id}\nType: ${item.type}\nScore: ${item.score}`,
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.avatarContainer}>
            <Avatar.Image source={{uri: item.avatar_url}} />
          </View>
          <TouchableOpacity
            onPress={() => showDetailAlert(item)}
            style={styles.textInfoContainer}>
            <Text style={styles.textInfo}>{item.login}</Text>
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

export default UserList;
