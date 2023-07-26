import React, { useContext } from 'react';
import Logo from 'components/molecules/Logo/Logo';
import NavigationWrapper from 'components/molecules/Navigation/Navigation.styles';
import AuthContext from 'providers/AuthProvider';
import NavWithIcon from 'components/molecules/NavWithIcon/NavWithIcon';

import { ReactComponent as BooksIcon } from 'assets/icons/collections_bookmark_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as AddBookIcon } from 'assets/icons/library_add_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as HistoryIcon } from 'assets/icons/history_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as ManageIcon } from 'assets/icons/swap_horiz_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as UsersIcon } from 'assets/icons/account_circle_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout_FILL0_wght600_GRAD0_opsz48.svg';

const Navigation = () => {
  const { auth } = useContext(AuthContext);

  return (
    <NavigationWrapper>
      <Logo className="logo small black">Municipal Library</Logo>

      <div className="user-name">{auth.firstName + ' ' + auth.lastName}</div>

      <div className="nav-container">
        <NavWithIcon name={'Books'} destination={'/books'} Icon={BooksIcon} />
        <NavWithIcon name={'Add book'} destination={'/add-book'} Icon={AddBookIcon} />
        <NavWithIcon name={'History'} destination={'/history'} Icon={HistoryIcon} />
        <NavWithIcon name={'Manage borrowings'} destination={'/manage-borrowings'} Icon={ManageIcon} />
        <NavWithIcon name={'Users'} destination={'/users'} Icon={UsersIcon} />
        <NavWithIcon name={'Settings'} destination={'/settings'} Icon={SettingsIcon} />
      </div>

      <NavWithIcon className="logout" name={'Log out'} destination={'/login'} Icon={LogoutIcon} />
    </NavigationWrapper>
  );
};

export default Navigation;