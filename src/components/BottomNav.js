import React from 'react';

import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';


const BottomNav = ({navigation, state}) => {

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])
      }>
      <BottomNavigationTab  title='USERS'/>
      <BottomNavigationTab  title='ORDERS'/>
      <BottomNavigationTab title='TRANSACTIONS'/>
    </BottomNavigation>
  );
};

export default BottomNav;