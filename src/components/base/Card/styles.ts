import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: '85%',
    marginHorizontal: 20,
    backgroundColor: '#C0C7C8',
    borderWidth: 1,
  },
  cardHeader: {
    backgroundColor: '#0300A8',
    margin: 2,
    marginBottom: 10,
    padding: 4
  },
  cardHeaderLabel: {
    color: '#FFFFFF',
  },
  hero: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  cardBody: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderWidth: 1,
  },
});

export default styles;
