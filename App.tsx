import {  StatusBar, StyleSheet } from 'react-native';
import TrafficSignalScreen from './src/screens/TrafficSignalScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated translucent barStyle={'light-content'}/>
      <TrafficSignalScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
});
