import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { buscarVideos } from './youtube'; // ou buscarVideosVimeo para Vimeo

export default function VideoScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [videos, setVideos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bounceValue] = useState(new Animated.Value(0));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideos(pesquisa);
      setVideos(resultados);
      Animated.sequence([
        Animated.timing(bounceValue, { toValue: 1.5, duration: 500, useNativeDriver: true }),
        Animated.timing(bounceValue, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    } catch (erro) {
      console.error('Erro ao pesquisar vídeos:', erro);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : null]}>
      <View style={styles.header}>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDarkMode : null]}
          placeholder="Pesquisar vídeos..."
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
          value={pesquisa}
          onChangeText={setPesquisa}
        />
        <TouchableOpacity style={[styles.button, isDarkMode ? styles.buttonDarkMode : null]} onPress={pesquisar}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <ScrollView style={styles.scrollView}>
        {videos.map((video, index) => (
          <Animated.View key={video.id.videoId} style={[styles.videoContainer, { transform: [{ scale: bounceValue }] }]}>
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ html: `<iframe width="100%" height="215" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>` }}
            />
            <Text style={styles.videoTitle}>{video.snippet.title}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  darkMode: {
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  inputDarkMode: {
    color: '#fff',
    backgroundColor: '#fff',
    borderColor: '#666',
  },
  button: {
    backgroundColor: '#c4302b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonDarkMode: {
    backgroundColor: '#c4302b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#c4302b',
    color: '#fff',
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});
