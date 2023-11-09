import React from 'react';
import {DialogStateProps} from '../components/common/dialog';
import {PhantomSessionprops} from '../constants/phantom';
import {SignBlockchainModalProps} from '../components/specific/signBlockchainModal';

export interface initialStateProps {
  loading: boolean;
  opacity: number;
  user: object | null;
  selectedWallet: string;
  idTokens: Array<string>;
  phantomSessions: Array<PhantomSessionprops>;
  dialog: DialogStateProps;
  signModal: SignBlockchainModalProps;
  signClient: any;
  navigation: {
    navigate: Function;
  };
}

const initialState: initialStateProps = {
  loading: true,
  opacity: 1,
  user: null,
  selectedWallet: '',
  idTokens: [],
  phantomSessions: [],
  signClient: null,
  dialog: {
    open: false,
    onClose: () => {},
    title: '',
    description: '',
    call2actions: [],
  },
  signModal: {
    open: false,
    destination: '',
    amount: 0,
  },
  navigation: {
    navigate: () => {},
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORE':
      return {...state, [action.label]: action.payload};
    case 'RESET_DATA':
      return {...initialState};
    default:
      return state;
  }
};

export const Store = React.createContext(null);

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    props?.initialState
      ? {...initialState, ...(props?.initialState || {})}
      : initialState,
  );
  const value: any = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
