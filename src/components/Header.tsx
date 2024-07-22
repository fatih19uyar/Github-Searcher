import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

interface HeaderProps {
  userInput: string;
  setUserInput: (text: string) => void;
  handleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userInput,
  setUserInput,
  handleSearch,
}) => {
  const imageHeader = {
    uri: 'https://img.freepik.com/free-vector/modern-cloudy-skyscape-background-with-papercut-effect_1017-50492.jpg?t=st=1721687162~exp=1721690762~hmac=e0d7dbc7d9d4c775679d4d194358a6921e4adf69213749710b2dae1f2066f60d&w=1800',
  };

  return (
    <View style={styles.header}>
      <ImageBackground
        source={imageHeader}
        resizeMode="cover"
        style={styles.imageBackgroundStyle}>
        <Text style={styles.textHeader}>GitHub Searcher</Text>
        <View style={styles.fixToRow}>
          <TextInput
            style={styles.input}
            onChangeText={setUserInput}
            value={userInput}
            placeholder={'Enter User Name'}
            placeholderTextColor="black"
            textAlign="center"
          />
          <TouchableOpacity onPress={handleSearch} style={styles.touchStyles}>
            <Text style={styles.textButton}>Search</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    maxHeight: 150,
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  fixToRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: 200, // width ekleyin
    margin: 15,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  touchStyles: {
    borderColor: 'red',
    borderWidth: 2,
    padding: 8,
    backgroundColor: '#FF4949',
    borderRadius: 5,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Header;
