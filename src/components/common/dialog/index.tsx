import React from 'react';
import {Text, View} from 'react-native';

import {Store, initialStateProps} from '../../../hooks/main_store';
import Model from '../../../hooks/Model';
import Touch from '../touch';
import styles from './styles';

interface DialogProps {
  style?: object;
}

interface Call2ActionProps {
  label: string;
  onPress: Function;
  style: 'done' | 'cancel' | null;
}

export interface DialogStateProps {
  open: boolean;
  onClose: Function;
  title: string;
  description: string;
  call2actions: Array<Call2ActionProps>;
}

const Dialog = ({style}: DialogProps) => {
  const {
    state: {
      dialog: {open, onClose, title, description, call2actions},
    },
  }: {state: initialStateProps} = React.useContext<any>(Store);

  const renderCall2Actions = () =>
    call2actions?.map?.((cta: Call2ActionProps) => (
      <Touch
        key={cta.label}
        style={[
          styles.containerCta,
          cta.style === 'done' ? styles.containerBgCta : '',
        ]}
        onPress={cta.onPress}>
        <Text
          style={[
            styles.textCta,
            cta.style === 'done' ? styles.textWhite : {},
          ]}>
          {cta.label}
        </Text>
      </Touch>
    ));

  const pressOnBackdrop = () => {
    Model.setStore('dialog', {open: false});

    if (onClose) {
      onClose();
    }
  };

  return open ? (
    <View style={[styles.container, style]}>
      <Touch style={styles.backdropButton} onPress={pressOnBackdrop} />
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.rowCtas}>{renderCall2Actions()}</View>
      </View>
    </View>
  ) : null;
};

export default Dialog;
