import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfessionalMode from '../Mode/ProfessionalMode.js';
import HandoverMode from '../Mode/HandoverMode.js';
import StopSession from '../Pages/StopSession.js';
import EndSession from '../Pages/EndSession.js';
import Guide from '../Pages/Guide.js';
import ModalMenu from './ModalMenu.js';
import SkipQuestion from '../Pages/SkipQuestion.js';

const AppNavigator = createStackNavigator({
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
