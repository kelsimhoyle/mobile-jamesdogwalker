import React from 'react';

import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';


const BottomNav = ({navigation, state}) => {

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])
      }>
      <BottomNavigationTab  title='Home'/>
      <BottomNavigationTab  title='Walk'/>
      <BottomNavigationTab title='Users'/>
    </BottomNavigation>
  );
};

export default BottomNav;