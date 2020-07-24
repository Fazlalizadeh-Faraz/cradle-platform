import { Callback, OrUndefined } from '@types';

import { DefaultSearch } from '../../../../shared/components/defaultSearch';
import { GlobalSearch } from './globalSearch';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { ReferredPatients } from './referredPatients';
import { useStyles } from '../../../../shared/styles/toolbar';
import { useTimeout } from '../../../../shared/hooks/timeout';

interface IProps {
  loading: boolean;
  toggleShowReferredPatients: () => void;
  toggleGlobalSearch: Callback<boolean>;
  updateSearchText: Callback<OrUndefined<string>>;
  globalSearch?: boolean;
  globalSearchAction?: boolean;
  searchText?: string;
  showReferredPatients?: boolean;
}

const Toolbar: React.FC<IProps> = ({
  loading,
  showReferredPatients,
  toggleShowReferredPatients,
  toggleGlobalSearch,
  globalSearchAction = false,
  ...props
}) => {
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const classes = useStyles();
  useTimeout({
    startTimer: loading,
    onTimeoutComplete: (): void => {
      setShowLoader(true);
    },
    onWithoutTimeout: (): void => {
      setShowLoader(false);
    },
  });

  return (
    <>
      {showLoader && (
        <LinearProgress
          className={classes.linearProgress}
          color="primary"
          variant="indeterminate"
        />
      )}
      <div className={classes.toolbarActions}>
        <DefaultSearch {...props} />
        {globalSearchAction && (
          <GlobalSearch
            className={classes.spacedAction}
            globalSearch={props.globalSearch}
            toggleGlobalSearch={toggleGlobalSearch}
          />
        )}
        <ReferredPatients
          showReferredPatients={showReferredPatients}
          toggleShowReferredPatients={toggleShowReferredPatients}
        />
      </div>
    </>
  );
};

export const customToolbarRender = (args: IProps): (() => JSX.Element) => {
  return (): JSX.Element => <Toolbar {...args} />;
};
