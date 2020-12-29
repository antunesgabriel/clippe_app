import React from 'react';
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StackActions, useNavigation} from '@react-navigation/native';

import {useAuth} from 'src/hooks/useAuth';

type TopBarProps = {
  title: string | any;
  subtitle?: string;
  onPressBack?(): void;
};

const BackIcon = (props: any) => {
  return <Icon {...props} name="arrow-back" />;
};

const MenuIcon = (props: any) => <Icon {...props} name="more-vertical" />;

const LogoutIcon = (props: any) => <Icon {...props} name="log-out" />;

const TopBar: React.FC<TopBarProps> = ({title, subtitle, onPressBack}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const {actionLogout} = useAuth();
  const navigator = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onPressLogout = async () => {
    const result = await actionLogout();
    setMenuVisible(false);
    if (result) {
      navigator.dispatch(StackActions.popToTop());
    }
  };

  const renderMenuAction = () => (
    <TopNavigationAction
      appearance="control"
      icon={MenuIcon}
      onPress={toggleMenu}
    />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={LogoutIcon}
          title="Logout"
          onPress={onPressLogout}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction appearance="control" icon={BackIcon} />
  );

  return (
    <TopNavigation
      alignment="center"
      title={title}
      subtitle={subtitle}
      accessoryLeft={onPressBack ? renderBackAction : undefined}
      accessoryRight={renderRightActions}
      appearance="control"
    />
  );
};

export default TopBar;
