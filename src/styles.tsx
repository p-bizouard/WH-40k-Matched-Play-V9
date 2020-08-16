import { StyleSheet, Dimensions } from 'react-native'
import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#172629',
    accent: '#6eccc9',
    add: '#628831',
    // background: 'blue',
    // surface: 'yellow',
    // backdrop: 'purple',
    // placeholder: 'pink',
  },
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width:
      Dimensions.get('window').width > 600
        ? 600
        : Dimensions.get('window').width,
    maxWidth: '100%',
    padding: 20,
  },
  team: {
    borderTopColor: '#555',
    width: '100%',
  },
  addButton: {
    color: '#628831',
  },
  mb10: {
    marginBottom: 10,
  },
  mr10: {
    marginRight: 10,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  flexViewLeft: {
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 20,
    borderTopColor: '#eee',
    borderTopWidth: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
  dialog: {
    maxWidth: 600,
    alignSelf: 'center',
    maxHeight: '85%',
  },
})

export default styles
