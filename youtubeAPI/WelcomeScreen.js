import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/youtube_logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.welcomeText}>Bem-vindo ao App de Pesquisa de Vídeos!</Text>
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.startButtonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#c4302b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
