import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../components/Header';
import RepositoryList from '../components/RepositoryList';
import UserList from '../components/UserList';
import {fetchUserName, fetchRepositories} from '../services/api';
import Loading from '../components/Loading';

const HomeScreen: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUserName, setDataUserName] = useState([]);
  const [dataRepositories, setRepositories] = useState([]);
  const image = {
    uri: 'https://i.pinimg.com/originals/da/2a/db/da2adb3535e09d2cdab498c0e1b4f356.png',
  };

  const handleSearch = () => {
    if (userInput.trim() === '') {
      Toast.show('Please Input User Name!', Toast.SHORT);
    } else {
      Toast.show(
        "If you want to go to the user's details, you should press the user name.",
        Toast.LONG,
      );
      handleSubmitRepositories();
      handleSubmitUserName();
      setUserInput('');
    }
  };

  const handleSubmitUserName = async () => {
    setLoading(true);
    const users = await fetchUserName(userInput);
    setDataUserName(users);
    setLoading(false);
  };

  const handleSubmitRepositories = async () => {
    setLoading(true);
    const repositories = await fetchRepositories(userInput);
    setRepositories(repositories);
    setLoading(false);
  };

  const FirstRoute = () => <RepositoryList data={dataRepositories} />;
  const SecondRoute = () => <UserList data={dataUserName} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackgroundStyle}>
        <Header
          userInput={userInput}
          setUserInput={setUserInput}
          handleSearch={handleSearch}
        />
        <TabView
          navigationState={{
            index: 0,
            routes: [
              {key: 'first', title: 'Repositories'},
              {key: 'second', title: 'Users'},
            ],
          }}
          renderScene={renderScene}
          onIndexChange={() => {}}
          initialLayout={{width: 300}}
          renderTabBar={props => <TabBar {...props} />}
        />
      </ImageBackground>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
