import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfessionalMode from '../Mode/ProfessionalMode.js';
import EndSession from '../Pages/EndSession.js';
import Guide from '../Pages/Guide.js';

const AppNavigator = createStackNavigator({
  Guide: {screen: Guide},
  EndSession: {screen: EndSession},
  ProfessionalMode: {screen: ProfessionalMode},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
