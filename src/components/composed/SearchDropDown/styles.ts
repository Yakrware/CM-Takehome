import { StyleSheet, Dimensions } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    zIndex: 9999,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  list: {
    top: 60,
    marginHorizontal: 20,
    width: '100%',
    maxHeight: WINDOW_HEIGHT * 0.75,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  noResultsFound: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
