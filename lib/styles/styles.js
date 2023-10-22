import { StyleSheet } from 'react-native';
import { BORDER, WHITE, BLACK } from '../constants/colors.js';


export const STYLES = StyleSheet.create({
    title: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    text: {
        color: BLACK,
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      color: BLACK,
      backgroundColor: WHITE,
      borderBottomColor: BORDER,
      borderBottomWidth: 1,
    },
    warning: {
        color: 'red',
    },
    success: {
        color: 'green'
    }
});
