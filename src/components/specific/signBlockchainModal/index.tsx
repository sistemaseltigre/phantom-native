import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ethers} from 'ethers';
import Clipboard from '@react-native-clipboard/clipboard';

import {Store, initialStateProps} from '../../../hooks/main_store';
import {
  maticEthersProvider,
  ethEthersProvider,
} from '../../../constants/web3auth';
import {returnWallets} from '../../../helpers/formatWallets';
import Model from '../../../hooks/Model';
import Touch from '../../common/touch';

import ItemWalletList from '../itemWalletList';
import styles from './styles';

const {width} = Dimensions.get('window');

const providers = [
  {
    label: 'Solana',
    image: require('../../../assets/images/logos/solana.png'),
  },
  {
    label: 'Ethereum',
    image: require('../../../assets/images/logos/ethereum-logo.png'),
  },
  {
    label: 'Matic',
    image: require('../../../assets/images/logos/polygon-logo.png'),
  },
];

const blockchainsProviders = {
  Ethereum: ethEthersProvider,
  Matic: maticEthersProvider,
};

// const chainIds = {
//   Ethereum: __DEV__ ? 'eip155:5' : 'eip155:1',
//   Matic: __DEV__ ? 'eip155:80001' : 'eip155:137',
// };

export interface SignBlockchainModalProps {
  open: boolean;
  destination: string;
  amount: number;
}

const SignBlockchainModal = () => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);

  const [showConfirm, setShowConfirm] = React.useState<boolean>(false);
  const [showAccountsList, setShowAccountsList] = React.useState<any>(null);
  const [blockchain, setBlockchain] = React.useState<string>('');
  const [transactionInfo, setTransactionInfo] = React.useState<any>(null);
  const [selectedWallet, setSelectedWallet] = React.useState<any>(
    state.selectedWallet,
  );

  const pressClose = () => {
    Model.setStore('signModal', {open: false});
    setSelectedWallet(state.selectedWallet);
    setShowAccountsList(null);
    setBlockchain('');
    setShowConfirm(false);
    setTransactionInfo(null);
  };

  const web3AuthSign = async (currentWallet: any) => {
    try {
      Model.setStore('loading', true);
      const web3authProvider = await Model.returnWeb3AuthSession(
        currentWallet,
        state,
      );

      if (web3authProvider) {
        const wallet = new ethers.Wallet(
          web3authProvider?.privKey,
          blockchainsProviders[blockchain],
        );

        const address = await wallet.address;
        const balance = await wallet.getBalance();

        if (parseFloat(balance as any) < state.signModal.amount) {
          return setTransactionInfo({
            error: "Your wallet doesn't have enough funds",
            address,
          });
        }

        const tx = await wallet.sendTransaction({
          to: state.signModal.destination,
          value: ethers.utils.parseEther(String(state.signModal.amount)),
        });

        setTransactionInfo({
          address,
          hash: tx.hash,
        });
      } else {
        throw 'No Web3Auth session, please reload whole app';
      }
    } catch (e) {
      setTransactionInfo({
        error: e ? String(e) : 'Unknow',
      });
    } finally {
      Model.setStore('loading', false);
    }
  };
  
  const phantomSign = async (currentWallet: any) => {
    try {
      Model.setStore('loading', true);

      console.log('currentWallet: ', currentWallet);
      // TODO sing transaction with Phantom's docs
    } catch (e) {
      setTransactionInfo({
        error: e ? String(e) : 'Unknow',
      });
    } finally {
      Model.setStore('loading', false);
    }
  };

  const renderBlockchainProviders = () => {
    return providers.map(provider => {
      const itemWidth = width / providers.length;

      return (
        <Touch
          key={provider.label}
          style={[
            styles.ctaProvider,
            {width: itemWidth - 78},
            blockchain === provider.label || !blockchain ? styles.opacity : {},
          ]}
          onPress={() => setBlockchain(provider.label)}>
          <Image source={provider.image} style={styles.logoProvider} />
          <Text style={styles.labelProvider} numberOfLines={1}>
            {provider.label}
          </Text>
        </Touch>
      );
    });
  };

  const renderSelectedWallet = () => {
    const allWallets: any[] = returnWallets('multiple', state, selectedWallet);
    let defaultWallet: number = allWallets.findIndex(
      ({address}) => address === selectedWallet,
    );

    if (showAccountsList) {
      return allWallets.map(wallet => (
        <ItemWalletList
          key={wallet.address}
          onPress={() =>
            selectedWallet === wallet.address
              ? null
              : setSelectedWallet(wallet.address)
          }
          wallet={wallet}
          variant="dark"
          selectedWallet={selectedWallet}
        />
      ));
    } else if (allWallets?.[defaultWallet]?.image) {
      return (
        <View style={styles.rowAccount}>
          <ItemWalletList
            onPress={() => {}}
            wallet={allWallets?.[defaultWallet]}
            style={styles.itemAccount}
            noSelected
            variant="dark"
          />
          <Touch
            style={styles.buttonChange}
            onPress={() => setShowAccountsList(true)}>
            <Image
              source={require('../../../assets/images/icons/change-account.png')}
              style={styles.changeIcon}
            />
          </Touch>
        </View>
      );
    } else {
      return <Text style={styles.emptyWallet}>You don't have wallets</Text>;
    }
  };

  const returnFromAccount = () => {
    const allWallets: any[] = returnWallets('multiple', state, selectedWallet);
    const defaultWallet: any =
      allWallets[
        allWallets.findIndex(({address}) => address === selectedWallet)
      ];

    return `${defaultWallet?.label} (${defaultWallet?.address.slice(
      0,
      3,
    )}...${defaultWallet?.address.slice(defaultWallet?.address.length - 3)})`;
  };

  const returnLabelSubmit = () => {
    return transactionInfo
      ? 'Close'
      : showConfirm
      ? 'Confirm transaction'
      : showAccountsList
      ? 'Done'
      : !blockchain
      ? 'Select a blockchain'
      : !selectedWallet
      ? 'Select an account'
      : 'Connect to sign';
  };

  const returnBodyContent = () => {
    if (transactionInfo) {
      return (
        <>
          <Text style={styles.labelBody}>INFORMATION</Text>
          <View style={styles.listInfoBody}>
            {transactionInfo?.hash ? (
              <Touch
                style={styles.rowInfoBody}
                onPress={() => {
                  Linking.openURL(
                    `https://mumbai.polygonscan.com/tx/${transactionInfo.hash}`,
                  );
                }}>
                <Text style={styles.bold}>Hash: </Text>
                <Text style={styles.infoBody}>{transactionInfo.hash}</Text>
              </Touch>
            ) : null}
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>Status: </Text>
              <Text
                style={[
                  styles.infoBody,
                  transactionInfo?.error ? styles.textRed : styles.textGreen,
                ]}>
                {transactionInfo?.error ? 'FAILED' : 'SUCCESS'}
              </Text>
            </View>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>Amount: </Text>
              <Text style={styles.infoBody}>
                {state?.signModal?.amount || 0} ETH
              </Text>
            </View>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>Blockchain: </Text>
              <Text style={styles.infoBody}>{blockchain}</Text>
            </View>
            <Touch
              style={styles.rowInfoBody}
              onPress={() => {
                Clipboard.setString(transactionInfo?.address);
                Alert.alert('Done', 'Address copied and ready to paste');
              }}>
              <Text style={styles.bold}>From: </Text>
              <Text style={styles.infoBody}>{transactionInfo?.address}</Text>
            </Touch>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>To: </Text>
              <Text style={styles.infoBody}>
                {state?.signModal?.destination || '-'}
              </Text>
            </View>
            {transactionInfo?.error ? (
              <Text style={styles.errorLabelBody}>
                {transactionInfo?.error}
              </Text>
            ) : null}
          </View>
        </>
      );
    } else if (showConfirm) {
      return (
        <>
          <Text style={styles.labelBody}>TRANSACTION INFO</Text>
          <View style={styles.listInfoBody}>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>Amount: </Text>
              <Text style={styles.infoBody}>
                {state?.signModal?.amount || 0} SOL
              </Text>
            </View>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>Blockchain: </Text>
              <Text style={styles.infoBody}>{blockchain}</Text>
            </View>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>From: </Text>
              <Text style={styles.infoBody}>{returnFromAccount()}</Text>
            </View>
            <View style={styles.rowInfoBody}>
              <Text style={styles.bold}>To: </Text>
              <Text style={styles.infoBody}>
              GLGYPd7LwNEdTbyjDYwcVu6y12kxK3s1mfPvY4BsB5aE
                {/* {state?.signModal?.destination || '-'} */}
              </Text>
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <Text style={styles.labelBody}>ACCOUNT</Text>
        {renderSelectedWallet()}
      </>
    );
  };

  const onSubmit = () => {
    const currentWallet: any = returnWallets('single', state, selectedWallet);
    if (transactionInfo) {
      pressClose();
    } else if (showConfirm) {
      if (currentWallet.phantom_encryption_public_key) {
        console.log("choose phantom");
        phantomSign(currentWallet);
      } else {
        web3AuthSign(currentWallet);
      }
    } else if (showAccountsList) {
      setShowAccountsList(false);
    } else {
      setShowConfirm(true);
    }
  };

  React.useEffect(() => {
    setSelectedWallet(state.selectedWallet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedWallet]);

  return state?.signModal?.open ? (
    <View style={styles.container}>
      <Touch style={styles.backdropButton} onPress={pressClose} />
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logo} />
          <View style={styles.containerTextHeader}>
            <Text style={styles.titleHeader}>Sign transaction</Text>
            <Text style={styles.textHeader}>
              {showConfirm
                ? 'Please confirm the following data to sign your transaction'
                : 'Select a blockchain of the following to continue'}
            </Text>
          </View>
        </View>
        <ScrollView
          style={styles.body}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {returnBodyContent()}

          {showAccountsList || showConfirm ? null : (
            <>
              <View style={styles.separatorBody} />
              <Text style={styles.labelBody}>BLOCKCHAIN</Text>
              <ScrollView
                horizontal
                style={styles.rowCtasBlockchains}
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {renderBlockchainProviders()}
              </ScrollView>
              <View style={styles.separatorBody} />
            </>
          )}

          <Touch
            style={styles.buttonBody}
            onPress={onSubmit}
            disabled={(!blockchain || !selectedWallet) && !showAccountsList}>
            <Text style={styles.labelButtonBody}>{returnLabelSubmit()}</Text>
          </Touch>
          {showConfirm && !transactionInfo ? (
            <Touch
              style={styles.cancelButtonBody}
              onPress={() => setShowConfirm(false)}>
              <Text style={styles.labelCancelButtonBody}>Cancel</Text>
            </Touch>
          ) : null}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.rowTerms}>
            <Touch>
              <Text style={styles.textCtaTerm}>Terms of use</Text>
            </Touch>
            <Text style={styles.textCtaTerm}>{' | '}</Text>
            <Touch>
              <Text style={styles.textCtaTerm}>Privacy policy</Text>
            </Touch>
          </View>
          <View style={styles.rowSecure}>
            <Text style={styles.labelSecure}>Secured by</Text>
            <View style={styles.imagesRowSecure}>
              <Image
                source={require('../../../assets/images/logos/w3a.png')}
                style={styles.imageSecure}
              />
              {/* <Image
                source={require('../../../assets/images/logos/wc.png')}
                style={styles.imageSecure}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

export default SignBlockchainModal;
