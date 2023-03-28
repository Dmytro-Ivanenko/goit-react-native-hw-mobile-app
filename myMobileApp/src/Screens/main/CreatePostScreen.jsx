import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const CreatePostScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      await requestPermission();
    })();
  }, []);

  const handleImageUpload = () => {
    console.log(cameraRef);
  };

  const handlePublish = () => {
    // Add logic to publish post
    console.log('Фото опубліковане');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={CameraType.back}
          ref={setCameraRef}
          ratio="4:3"
        >
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={handleImageUpload}
          >
            <Ionicons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </Camera>
        <Text style={{ color: '#BDBDBD' }}>Завантажте фото</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Місцевість..."
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        disabled={!title || !location}
        style={{
          ...styles.uploadButton,
          ...(title && location ? styles.publishButton : styles.disabledButton),
        }}
        onPress={handlePublish}
      >
        <Text
          style={title && location ? styles.publishText : styles.disabledText}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },

  cameraContainer: {
    marginBottom: 32,
  },
  camera: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  cameraIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',

    padding: 8,
    marginBottom: 16,
  },

  uploadButton: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 32,
  },

  publishButton: {
    backgroundColor: '#FF6C00',
  },
  disabledButton: {
    backgroundColor: '#F6F6F6',
  },
  publishText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledText: {
    color: '#BDBDBD',
    fontSize: 16,
  },
});

export default CreatePostScreen;
