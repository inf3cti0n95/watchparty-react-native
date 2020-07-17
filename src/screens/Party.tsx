import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PlayerControls, ProgressBar} from '../components/Player';

const FullscreenClose = <MaterialIcons name="md-fullscreen" size={20} />;
const FullscreenOpen = <MaterialIcons name="md-fullscreen" size={20} />;

interface State {
  fullscreen: boolean;
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

export const VideoPlayer: React.FC = () => {
  const videoRef = React.createRef<Video>();
  const [state, setState] = useState<State>({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{
              uri:
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.fullscreenButton}>
                {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim
          suscipit ipsa impedit laboriosam saepe, sapiente excepturi molestiae
          laudantium, non tempora cumque, quam assumenda deserunt? Similique
          eaque voluptas itaque corporis. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sequi unde iusto vel facere quibusdam nisi placeat,
          debitis veritatis autem deserunt at voluptas nam ut mollitia qui fugit
          minus minima quod.
        </Text>
      </ScrollView>
    </View>
  );

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState((s) => ({...s, fullscreen: true})), StatusBar.setHidden(true))
      : (setState((s) => ({...s, fullscreen: false})),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    setTimeout(() => setState((s) => ({...s, showControls: false})), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({...state, currentTime: state.currentTime - 15});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({...state, currentTime: state.currentTime + 15});
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  function onLoadEnd(data: OnLoadData) {
    setState((s) => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data: OnProgressData) {
    setState((s) => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
