import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfessionalMode from '../Mode/ProfessionalMode.js';
import EndSession from '../Pages/EndSession.js';
import Guide from '../Pages/Guide.js';

const AppNavigator = createStackNavigator({
  ProfessionalMode: {screen: ProfessionalMode},
  EndSession: {screen: EndSession},
  Guide: {screen: Guide},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
