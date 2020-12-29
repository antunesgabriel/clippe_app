import 'react-native-gesture-handler';

import * as React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';

import {AuthProvider} from './context/auth.context';
import RootRoutes from './routes/root.routes';
import {myThemeLight} from './theme/custom-theme-light';
import {ClipProvider} from './context/clip.context';

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ClipProvider>
          <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={myThemeLight}>
              <RootRoutes />
            </ApplicationProvider>
          </>
        </ClipProvider>
      </AuthProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

export default App;
