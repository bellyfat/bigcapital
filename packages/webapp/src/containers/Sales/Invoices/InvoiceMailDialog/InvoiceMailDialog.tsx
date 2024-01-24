// @ts-nocheck
import React from 'react';
import { Dialog, DialogSuspense } from '@/components';
import withDialogRedux from '@/components/DialogReduxConnect';
import { compose } from '@/utils';

const InvoiceMailDialogContent = React.lazy(
  () => import('./InvoiceMailDialogContent'),
);

/**
 * Invoice mail dialog.
 */
function InvoiceMailDialog({
  dialogName,
  payload: {
    invoiceId = null,

    // Redirects to the invoices list.
    redirectToInvoicesList = false,
  },
  isOpen,
}) {
  return (
    <Dialog
      name={dialogName}
      title={'Invoice Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <InvoiceMailDialogContent
          dialogName={dialogName}
          invoiceId={invoiceId}
          redirectToInvoicesList={redirectToInvoicesList}
        />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(InvoiceMailDialog);
