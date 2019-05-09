import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfessionalMode from '../Mode/ProfessionalMode.js';
import HandoverMode from '../Mode/HandoverMode.js';
import StopSession from '../Pages/StopSession.js';
import EndSession from '../Pages/EndSession.js';
import Guide from '../Pages/Guide.js';
import ModalMenu from './ModalMenu.js';
import SkipQuestion from '../Pages/SkipQuestion.js';
import SplashScreen from '../Pages/SplashScreen.js';
import LoginPage from '../Pages/LoginPage.js';
import ProjectList from '../Pages/ProjectList.js';
import DataCollectionsList from '../Pages/DataCollectionsList.js';
import SubjectsList from '../Pages/SubjectsList.js';
import SubjectPage from '../Pages/SubjectPage.js';

const AppNavigator = createStackNavigator({
    SubjectPage: {screen: SubjectPage},
    SubjectsList: {screen: SubjectsList},
    DataCollectionsList: {screen: DataCollectionsList},
    ProjectList: {screen: ProjectList},
    LoginPage: {screen: LoginPage},
    SplashScreen: {screen: SplashScreen},
    ProfessionalMode: {screen: ProfessionalMode},
    ModalMenu: { screen: ModalMenu },
    StopSession: {screen: StopSession},
    EndSession: {screen: EndSession},
    Guide: {screen: Guide},
    SkipQuestion: {screen: SkipQuestion},
    HandoverMode: {screen: HandoverMode},
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
