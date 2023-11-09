import React from 'react';
import {
  TextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from 'react-native';

interface InputProps {
  placeholder?: string;
  style?: any;
  secureTextEntry?: boolean;
  onChangeText?: any;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  onSubmitEditing?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
  asignRef?: any;
  placeholderTextColor?: string;
  onBlur?: any;
  onFocus?: any;
  maxLength?: number;
  autoCorrect?: boolean;
  editable?: boolean;
  onEndEditing?: any;
}

const Input = ({
  placeholder,
  style,
  secureTextEntry,
  onChangeText = () => {},
  value,
  returnKeyType = 'done',
  onSubmitEditing,
  autoCapitalize = 'none',
  keyboardType = 'default',
  multiline = false,
  asignRef,
  placeholderTextColor = '#000',
  onBlur = () => {},
  onFocus = () => {},
  maxLength,
  autoCorrect = false,
  editable = true,
  onEndEditing = () => {},
}: InputProps) => {
  const defaultStyles = {fontSize: 17, color: 'black'};

  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={[defaultStyles, style]}
      ref={asignRef}
      {...{
        placeholder,
        secureTextEntry,
        onChangeText,
        value,
        returnKeyType,
        onSubmitEditing,
        autoCapitalize,
        keyboardType,
        multiline,
        placeholderTextColor,
        onBlur,
        onFocus,
        maxLength,
        autoCorrect,
        editable,
        onEndEditing,
      }}
    />
  );
};

export default Input;
