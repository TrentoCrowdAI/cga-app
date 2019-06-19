import React, {Component} from 'react';
import { StyleSheet, Image, Linking, Platform, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

export default class LoginPage extends Component {
   constructor(props){
    super(props);
    this.state = {
      user: undefined
    };
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
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListeners('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);

    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string)),
    });
    
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://cga-api.herokuapp.com/auth/google');

  logout = () => {
    return fetch('https://cga-api.herokuapp.com/logout')
      .then(response => {
        console.log('Logged out');
        this.setState({
          user: undefined
        });
      })
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


  myProjects = () => {
    fetch('https://cga-api.herokuapp.com/projects', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'connect.sid=' + this.state.user.accessToken + ";",
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.props.navigation.navigate("ProjectsList", {user: this.state.user, projects: responseJson});
    });
  };

  //Esempio di chiamata alle APIs, nel caso in cui venga fatta una richiesta mentre l'utente 
  //non è loggato o qualsiasi tipo di errore, gestire gli errori
  // prova = () => {
  //   return fetch('http://localhost:3000/prova',{
  //     method: 'get',
  //     headers: new Headers({
  //       ContentType: "application/json"
  //     })
  //   })
  //     .then(res => {
  //       console.log(res);
  //       if(res.status === 200){
  //         // TODO: gestire quando la chiamata va a buon fine
  //       } else{
  //         // TODO: gestire errori
  //         console.log(`status: ${res.status}, message: ${res.body}`);
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }

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