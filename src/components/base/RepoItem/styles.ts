import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0, 0.05)',
    shadowColor: 'black',
    borderWidth: 1,
  },
  itemContainer: {
    margin: 10,
  },
  boldLabel: {
    fontWeight: '800',
  },
  footerButton: {
    color: '#0300A8',
  },
  footer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: 1,
    height: 30,
    paddingRight: 10,
  }
});

export default styles;