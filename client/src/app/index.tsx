import { ActualUser, OrNull } from 'src/types';

import { ContextProvider } from 'src/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DimensionsContextProvider } from './context';
import Drawer from '@material-ui/core/Drawer';
import { LogoutMenuItem } from './logout';
import { Pathname } from 'history';
import React from 'react';
import { ReduxState } from 'src/redux/reducers';
import { RoleEnum } from 'src/enums';
import { Routes } from './routes';
import { Sidebar } from './sidebar';
import { TopBar } from './topBar';
import { routesNames } from './routes/utils';
import { useSelector } from 'react-redux';
import { useStyles } from './styles';

type SelectorState = {
  loggedIn: boolean;
  user: OrNull<ActualUser>;
  pathName: Pathname;
};

export const App: React.FC = () => {
  const drawerWidth = React.useRef<number>(200);
  const offsetFromTop = React.useRef<number>(36);
  const topBar = React.useRef<OrNull<HTMLElement>>(null);

  const classes = useStyles({
    drawerWidth: drawerWidth.current,
    offsetFromTop: offsetFromTop.current,
  });

  const [activeItem, setActiveItem] = React.useState<OrNull<string>>(null);

  const { loggedIn, pathName, user } = useSelector(
    ({ user, router }: ReduxState): SelectorState => ({
      loggedIn: user.current.loggedIn,
      user: user.current.data,
      pathName: router.location.pathname,
    })
  );

  React.useEffect(() => {
    setActiveItem(routesNames[pathName]);
  }, [pathName]);

  return (
    <ContextProvider>
      <DimensionsContextProvider
        drawerWidth={drawerWidth.current}
        offsetFromTop={offsetFromTop.current}>
        <CssBaseline />
        <div className={classes.root}>
          <TopBar ref={topBar} user={user} setActiveItem={setActiveItem} />
          {loggedIn ? (
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left">
              <div className={classes.toolbar} />
              <Sidebar
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                logout={{
                  index: user?.roles.includes(RoleEnum.ADMIN) ? 4 : 3,
                  component: <LogoutMenuItem />,
                }}
              />
            </Drawer>
          ) : null}
          <Routes topBarOffset={topBar.current?.offsetHeight} />
        </div>
      </DimensionsContextProvider>
    </ContextProvider>
  );
};
