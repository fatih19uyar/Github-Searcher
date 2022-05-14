import  React , {Component} from 'react';
import { Text, View, StyleSheet ,TouchableOpacity, Button, ToastAndroid,TextInput,ActivityIndicator, FlatList,Alert,ImageBackground, Image,ListRenderItem} from 'react-native';
import Toast from 'react-native-toast-message';
import { NativeModules,Linking } from "react-native";
import { Tabs } from 'react-native-collapsible-tab-view';
import { Avatar,List } from 'react-native-paper';
import AlertBox from 'react-native-easy-alert';  
ToastAndroid.show("Welcome!!", ToastAndroid.SHORT);

export default function App() {
 
  const [userInput, setUserInput] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [dataUserName, setDataUserName] = React.useState([]);
  const [dataRepositories, setRepositories] = React.useState([]);
  const image = { uri: "https://i.pinimg.com/originals/da/2a/db/da2adb3535e09d2cdab498c0e1b4f356.png" };
  const imageHeader = { uri: "https://yusufakan.rihem.net/wp-content/uploads/2018/01/header-cloud.jpg" };

   const handleSearch = (e) =>{
    setUserInput(e.target.value);
    if(userInput==''){
      setUserInput('');
      showEmptyAllert();
    }else{
      ToastAndroid.show("If you want to go to the user's deatils, you should press the user name.", ToastAndroid.LONG);
      handleSubmitRepositories();
     handleSubmitUserName();
       setUserInput('');
       
    }
     }

  const showEmptyAllert = ()=>{ Alert.alert("Error","Please Input User Name !",[{text: "Cancel",},],);}
  const showDetailAllertRepository = (e)=>{   
     Alert.alert(
      ""+e.name,
      "Account Creat Time: "+e.created_at+" Watchers: "+e.watchers+"   Language: "+e.language,
        [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Go to Profile", onPress: () => Linking.openURL(e.html_url) }
      ]
    );}
    
      const showDetailAllertUsers = (e)=>{   
          Alert.alert(
            ""+e.login,
            "ID: "+e.id+"  Type: '"+e.type+"'  Score: "+e.score,
              [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Go to Profile", onPress: () => Linking.openURL(e.html_url) }
            ]
          );}
  

  const handleSubmitUserName = async () =>{
      try {
      const response = await fetch('https://api.github.com/search/users?q='+userInput);
      const json = await response.json();
      setDataUserName(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitRepositories = async () =>{
      try {
      const response = await fetch('https://api.github.com/search/repositories?q='+userInput);
      const json = await response.json();
      setRepositories(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

const Header = () => {
  return <View style={styles.header} >
  <ImageBackground source={imageHeader} resizeMode="stretch" style={styles.imageBackgroundStyle}>
  <Text style={styles.textHeader}>
        GitHub Searcher 
        </Text>
<View style={styles.fixToRow}>
              <TextInput
                  style={styles.input}
                  onChangeText={setUserInput}
                  value={userInput}
                  placeholder={"Enter User Name"}
                  placeholderTextColor='black'
                  textAlign= 'center'
              />
                  <TouchableOpacity onPress={handleSearch}  style={styles.touchStyles}>
                 <Text fontSize={40} style={styles.textButton}>Search</Text>
                 </TouchableOpacity>
  </View>
    </ImageBackground>
  </View>

}

const renderItemRepositories: ListRenderItem<number> = React.useCallback(({ item }) => {
    return (
      <View style={styles.fixToItems}>
          <Avatar.Image margin={10} source={{uri: (item.owner.avatar_url)}} />
          
            <TouchableOpacity onPress={() =>showDetailAllertRepository(item)}  style={styles.textInfo}>
                <Text style={styles.textInfo}>{item.name}</Text>
                 </TouchableOpacity>
      </View>
    )
  }, [])
  const renderItemUser: ListRenderItem<number> = React.useCallback(({ item }) => {
    return (
      <View style={styles.fixToItems}>
          <Avatar.Image margin={10} source={{uri: (item.avatar_url)}} />
           <TouchableOpacity onPress={() =>showDetailAllertUsers(item)}  style={styles.textInfo}>
            <Text style={styles.textInfo}>{item.login}</Text>
             </TouchableOpacity>
      </View>
    )
  }, [])

 return (
  <View style={styles.container}>
  <ImageBackground source={image} resizeMode="cover" style={styles.imageBackgroundStyle}>
    <Tabs.Container renderHeader={Header}>
      <Tabs.Tab name="Result Repositories">
        <Tabs.FlatList
          data={dataRepositories}
          renderItem={renderItemRepositories}
         />
      </Tabs.Tab>
      <Tabs.Tab name="Result Users">
       <Tabs.FlatList
          data={dataUserName}
          renderItem={renderItemUser}
          />
      </Tabs.Tab>
    </Tabs.Container>
   </ImageBackground>
  </View>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
   },
  
   textHeader: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    },
  
  fixToRow: {
    borderBottomColor:'black',
    flexDirection: 'row',
    justifyContent:'center',
    alignContent: 'center'
  },
  fixToItems: {
    borderBottomColor:'black',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignContent: 'center'
  },
  input: {
    height: 40,
    margin: 15,
    marginRight:5,
    borderWidth: 2,
    borderColor:'red',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    justifyContent:'center'
  },
   header: {
    
  },
  touchStyles: {
    borderColor: 'red',
    borderWidth: 2 ,
    padding : 8,
    backgroundColor: '#FF4949',
    borderRadius: 5,
    width:80,
    height: 40,
    alignItems:'center',
    margin: 15,
    
  },
  textButton:{
      color:'white',
       fontSize: 17,
      fontWeight: 'bold',
  },
   textStyles:{
     fontSize: 20,
     color:'white',
     textAlign:'center',
     margin: 32,
     marginLeft: 5,
     fontWeight: 'bold',
  }, 
  textInfo:{
     fontSize: 20,
     color:'black',
     textAlign:'center',
      marginTop: 16,
     fontWeight: 'bold',
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: 'center'
      },
  
});

 
