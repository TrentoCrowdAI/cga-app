import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import ProfessionalMode from '../Mode/ProfessionalMode.js';
import HandoverMode from '../Mode/HandoverMode.js';
import StopSession from '../Pages/StopSession.js';
import Guide from '../Pages/Guide.js';
import ModalMenu from './ModalMenu.js';
import SkipQuestion from '../Pages/SkipQuestion.js';
import SplashScreen from '../Pages/SplashScreen.js';
import LoginPage from '../Pages/LoginPage.js';
import ProjectList from '../Pages/ProjectList.js';
import DataCollectionsList from '../Pages/DataCollectionsList.js';
import SubjectsList from '../Pages/SubjectsList.js';
import SubjectPage from '../Pages/SubjectPage.js';
import SideBar from "./SideBar.js";
import SideMenuIcon from "./SideMenuIcon.js";
import SyncList from "../Pages/SyncList.js";

const CgaTestNavigator_StackNavigator = createStackNavigator({  
    SplashScreen: {screen: SplashScreen},
    ProfessionalMode: {screen: ProfessionalMode},
    ModalMenu: { screen: ModalMenu },
    StopSession: {screen: StopSession},
    Guide: {screen: Guide},
    SkipQuestion: {screen: SkipQuestion},
    HandoverMode: {screen: HandoverMode},
  }
);

const ProjectsList_StackNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage
  },
  ProjectsList: {
    screen: ProjectList,
    navigationOptions: ({ navigation }) => ({
      title: 'Project List',
      headerLeft: <SideMenuIcon navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#EF233C'
      },
      headerTintColor: '#fff',
    })
  }, 
  DataCollectionsList: {screen: DataCollectionsList},
  SubjectsList: {screen: SubjectsList},
  SubjectPage: {screen: SubjectPage},
});

const SyncList_StackNavigator = createStackNavigator({
  SyncList: {
    screen: SyncList,
    navigationOptions: ({ navigation }) => ({
      title: 'Sync List',
      headerLeft: <SideMenuIcon navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#EF233C'
      },
      headerTintColor: '#fff',
    })
  },
});

const AppNavigator = createDrawerNavigator({
    ProjectsList: {
      screen: ProjectsList_StackNavigator
    },

    SyncList: {
      screen: SyncList_StackNavigator
    },

    CgaTestNavigator: {
      screen: CgaTestNavigator_StackNavigator
    },

  },
  {
    contentComponent: SideBar,
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
