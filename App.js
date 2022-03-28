import { StatusBar } from 'expo-status-bar';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import WebView from "react-native-webview";
import {useRef} from "react";

export default function App() {

  const webViewRef = useRef(null)
  const goback = () => {
    webViewRef.current.goBack();
  };

  BackHandler.addEventListener('hardwareBackPress', function () {
    goback();
    return true;
  });

  return (
      <WebView
          ref={webViewRef}
          style={styles.container}
          onLoadProgress={e => console.log('Cargando... ', Math.round(e.nativeEvent.progress*100))}
          allowsBackForwardNavigationGestures={true}
          originWhitelist={['*']}
          mixedContentMode="always"
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          source={{ uri: 'https://google.com'}}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
