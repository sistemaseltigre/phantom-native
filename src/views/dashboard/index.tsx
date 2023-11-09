import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';

import ProfileImage from '../../components/specific/profileImage';
import Touch from '../../components/common/touch';
import * as ROUTES from '../../constants/routes';
import Model from '../../hooks/Model';

import styles from './styles';

const Dashboard = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(1);

  const renderActions = () => {
    const actions = [
      {label: 'Send', onPress: testBlockchain},
      {label: 'Top Up'},
      {label: 'Swap'},
      {label: 'Buy'},
    ];

    return actions.map(action => (
      <Touch
        key={action.label}
        style={styles.containerAction}
        onPress={action?.onPress}>
        <View style={styles.buttonAction} />
        <Text style={styles.labelAction}>{action.label}</Text>
      </Touch>
    ));
  };

  const renderItemsList = () => {
    const items = new Array(12)
      .fill({id: 0})
      .map((data, index) => ({id: data.id + index}));

    return items.map(item => (
      <Touch key={item.id} style={styles.itemList}>
        <View style={styles.iconContainerItem} />
        <View style={styles.namesContainerItem}>
          <Text style={styles.nameItem}>BTC</Text>
          <Text style={styles.subNameItem}>Bitcoin</Text>
        </View>
        <View style={styles.graphContainerItem} />
        <View style={styles.numbersContainerItem}>
          <Text style={styles.priceItem}>$36,590.00</Text>
          <Text style={styles.rateItem}>+6.21%</Text>
        </View>
      </Touch>
    ));
  };

  const testBlockchain = async () => {
    Model.setStore('signModal', {
      open: true,
      destination: '0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56',
      amount: 0.001,
    });
  };

  React.useEffect(() => {
    Model.setStore('opacity', 0.7);
    Model.setStore('loading', false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.balanceContainer}>
          <View style={styles.amountBalanceContainer}>
            <View style={styles.iconAmountBalance} />
            <Text style={styles.textAmountBalance}>26,031</Text>
          </View>
          <View style={styles.labelBalanceContainer}>
            <Text style={styles.textLabelBalanceContainer}>Balance</Text>
          </View>
        </View>
        <View style={styles.blank} />
        <Touch style={styles.qrContainer} />
        <Touch
          style={styles.profileContainer}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}>
          <ProfileImage />
        </Touch>
      </View>

      <View style={styles.rowActions}>{renderActions()}</View>

      <View style={styles.containerToggle}>
        <Touch
          onPress={() => setSelectedTab(1)}
          style={[
            styles.buttonToggle,
            selectedTab === 1 ? styles.purpleBg : null,
          ]}>
          <Text
            style={[
              styles.labelToggle,
              selectedTab === 1 ? styles.whiteTxt : null,
            ]}>
            Tokens
          </Text>
        </Touch>
        <Touch
          onPress={() => setSelectedTab(2)}
          style={[
            styles.buttonToggle,
            selectedTab === 2 ? styles.purpleBg : null,
          ]}>
          <Text
            style={[
              styles.labelToggle,
              selectedTab === 2 ? styles.whiteTxt : null,
            ]}>
            NFTs
          </Text>
        </Touch>
      </View>

      <ScrollView style={styles.listContainer}>{renderItemsList()}</ScrollView>
    </View>
  );
};

export default Dashboard;
