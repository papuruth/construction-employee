import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, UIManager, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/containers/App';
import { persistor, store } from './src/store';
import { colors } from './src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default class App extends React.PureComponent {
  componentDidMount() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <PersistGate
              loading={(
                <View style={styles.container}>
                  <ActivityIndicator color={colors.red} />
                </View>
              )}
              persistor={persistor}
            >
              <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />
            </PersistGate>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
