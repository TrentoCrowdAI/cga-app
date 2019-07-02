import React, {Component} from 'react';
import { StyleSheet, Image, Linking, Platform, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
var RNFS = require('react-native-fs');
var pathUserId = RNFS.DocumentDirectoryPath + '/configFileUserId.txt';
var pathExpressSessionToken = RNFS.DocumentDirectoryPath + '/configFileExpressSessionToken.txt';
var pathExpressSessionSignatureToken = RNFS.DocumentDirectoryPath + '/configFileExpressSessionSignatureToken.txt';

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: undefined
    }; 
  }

  //called when the user perform the logout from the sidebar
  componentWillReceiveProps(nextProp){
    if(nextProp.navigation.state.params != undefined && nextProp.navigation.state.params.logout != undefined && nextProp.navigation.state.params.logout == true){//if the user tap the logout in the sidebar than we delete the user in the state and the info saved in order to recover the account
      this.setState({user: undefined});
      this.removeData(pathExpressSessionToken);
      this.removeData(pathExpressSessionSignatureToken);
      this.removeData(pathUserId);
    } 
  }

  recoverUserState = async () => {
    var userId; 
    var expressSessionCookie;
    var expressSessionSignatureCookie;
    await this.retrieveData(pathUserId).then((response) => userId = response);
    await this.retrieveData(pathExpressSessionToken).then((response) => expressSessionCookie = response);
    await this.retrieveData(pathExpressSessionSignatureToken).then((response) => expressSessionSignatureCookie = response);
    if(userId != undefined && expressSessionCookie != undefined && expressSessionSignatureCookie != undefined){
      fetch('https://cga-api.herokuapp.com/users/'+userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cookie': "express:sess=" + expressSessionCookie + '; express:sess.sig=' + expressSessionSignatureCookie + ';',
        },
      }).then((response) => response.json())
      .then((responseJson) => {//setting the user, then the render will reload the page automatically
        //console.log(responseJson);
        if(responseJson != undefined && responseJson != "User not authenticated"){
          responseJson[0].expressSessionCookie = expressSessionCookie;
          responseJson[0].expressSessionSignatureCookie = expressSessionSignatureCookie;
          this.setState({
            user: responseJson[0]
          });
          this.forceUpdate();
        }
      });  
    }
  }

  //Set up Linking 
  componentDidMount(){
    //Add event listener to handle OAuthLogin:// URL
    Linking.addEventListener('url', this.handleOpenURL);
    // Launch from an external URL 
    Linking.getInitialURL().then((url) => {
      if(url){
        this.handleOpenURL({ url });
      }  
    })
    this.recoverUserState();
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListeners('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    var [, user_string] = url.match(/user=([^#]+)/);

    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string)),
    });
    var user = JSON.parse(decodeURI(user_string));
    if(user != undefined && user.id != undefined && user.expressSessionCookie != undefined && user.expressSessionSignatureCookie != undefined){
      this.storeData(pathUserId, user.id).then((response) => {
        this.storeData(pathExpressSessionToken, user.expressSessionCookie).then((response) => {
          this.storeData(pathExpressSessionSignatureToken, user.expressSessionSignatureCookie).then((response) => {
            this.forceUpdate();
          });
        });
      });//when the user is retrieved we save this two data in order to recover it in a second time
      
    }else{
      alert("We're sorry but occurred some problem with the login, please try again. ");
    }

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Google button tap
  loginWithGoogle = async () => {
    this.openURL('https://cga-api.herokuapp.com/auth/google');
  }

  logout = () => {
    console.log('Logged out');
    this.setState({//if the user tap on logout removing the user in the state and the info saved
      user: undefined
    });
    this.removeData(pathExpressSessionToken);
    this.removeData(pathExpressSessionSignatureToken);
    this.removeData(pathUserId);
  }

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  //load the projects connected to the user from the api
  myProjects = () => {
    fetch('https://cga-api.herokuapp.com/projects', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': "express:sess=" + this.state.user.expressSessionCookie + '; express:sess.sig=' + this.state.user.expressSessionSignatureCookie + ';',
      },
    }).then((response) => response.json())
    .then((projectJson) => {
      if(projectJson != undefined && projectJson != "User not authenticated"){
        this.props.navigation.navigate("ProjectsList", {user: this.state.user, projects: projectJson});//moving to activity in order to choose the project
      }else{
        this.setState({
          user: undefined,
        });
        this.removeData(pathExpressSessionToken);
        this.removeData(pathExpressSessionSignatureToken);
        this.removeData(pathUserId);
        this.forceUpdate();
        alert("Session expired, please log-in with google.");
      }
    });
  }

  //store data in the device memory
  storeData = async (path, value) => {
    await RNFS.writeFile(path, value, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN ' + path);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  
  //retrieve data from the device
  retrieveData = async (path) => {
    return await RNFS.readFile(path, 'utf8')
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  //remove the data from the device
  removeData = async (path) =>{
    await RNFS.unlink(path)
    .then(() => {
      console.log('FILE DELETED ' + path);
    })
    .catch((err) => {// `unlink` will throw an error, if the item to unlink does not exist
      console.log(err.message);
    });
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        {/* // First section */}
        { user
          ? // Show user info if already logged in
          <View style={{flex:1}}>
            <View style={styles.contentThen}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
              <View style={styles.avatar}>
                <Image source={{ uri: user.avatar}} style={styles.avatarImage} />
              </View>
              <View style={styles.projectsButton} >
                <Icon.Button
                  onPress= {() => this.myProjects()}
                  name="book"
                  backgroundColor="#2b2d42"
                  {...iconStyles}
                >
                  <Text style={{fontSize:20, color:'white'}}>My Projects</Text>
                </Icon.Button>
              </View>
            </View>
            <View style={styles.contentLogout}>
              <Text style={styles.text}>
                Are you not {user.name}? 
              </Text>
              <View style={styles.logoutButton}>
                <Icon.Button
                  name="google"
                  backgroundColor="#DD4B39"
                  onPress={this.logout}
                  {...iconStyles}
                >
                  <Text style={{fontSize:20, color:'white'}}>Log out</Text>
                </Icon.Button>
              </View>
            </View>
           </View>
          : // Show Please log in message if not
          <View style={{flex:1}}>
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome!
              </Text>
              <View style={styles.avatar}>
                <Icon name="user-circle" size={200} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue {'\n'}
                to access to your projects
              </Text>
            </View>
            <View style={styles.loginButton}>
            <Icon.Button
              name="google"
              backgroundColor="#DD4B39"
              onPress={this.loginWithGoogle}
              {...iconStyles}
            >
              <Text style={{fontSize:20, color:'white'}}>With Google</Text>
            </Icon.Button>
          </View>
        </View>
        }
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
  height: 60,
  width: 200,
  justifyContent: 'center',
  size: 35,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 100,
  },
  contentThen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 300,
  },
  contentLogout: {
    flex: 1,
    paddingTop: 10,
    justifyContent:'flex-end',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 100,
    height: 200,
    width: 200,
    marginBottom: 30,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  projectsButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 50,
  },
  logoutButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 100,
  },
});