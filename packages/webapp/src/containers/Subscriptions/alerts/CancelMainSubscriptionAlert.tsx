// @ts-nocheck
import React from 'react';
import * as R from 'ramda';
import { Intent, Alert } from '@blueprintjs/core';
import { AppToaster, FormattedMessage as T } from '@/components';

import withAlertStoreConnect from '@/containers/Alert/withAlertStoreConnect';
import withAlertActions from '@/containers/Alert/withAlertActions';

import { useCancelMainSubscription } from '@/hooks/query/subscription';

/**
 * Cancel Unlocking partial transactions alerts.
 */
function CancelMainSubscriptionAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { module },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: cancelSubscription, isLoading } =
    useCancelMainSubscription();

  // Handle cancel.
  const handleCancel = () => {
    closeAlert(name);
  };
  // Handle confirm.
  const handleConfirm = () => {
    const values = {
      module: module,
    };
    cancelSubscription()
      .then(() => {
        AppToaster.show({
          message: 'The subscription has been cancel.',
          intent: Intent.SUCCESS,
        });
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {},
      )
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={'Cancel Subscription'}
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={isLoading}
    >
      <p>asdfsadf asdf asdfdsaf</p>
    </Alert>
  );
}

export default R.compose(
  withAlertStoreConnect(),
  withAlertActions,
)(CancelMainSubscriptionAlert);
