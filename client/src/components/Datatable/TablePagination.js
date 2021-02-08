import React, { useCallback, useContext } from 'react';
import { If, Pagination } from 'components';
import TableContext from './TableContext';
import { saveInvoke } from 'utils';

/**
 * Table pagination.
 */
export default function TablePagination() {
  const {
    table: {
      gotoPage,
      setPageSize,
      pageCount,
      state: { pageIndex, pageSize },
    },
    props: { pagination, loading, onPaginationChange },
  } = useContext(TableContext);

  const triggerOnPaginationChange = useCallback((payload) => {
    saveInvoke(onPaginationChange, payload)
  }, [onPaginationChange]);

  // Handles the page changing.
  const handlePageChange = useCallback(
    ({ page, pageSize }) => {
      const pageIndex = page - 1;

      gotoPage(pageIndex);
      triggerOnPaginationChange({ page, pageSize });
    },
    [gotoPage, triggerOnPaginationChange],
  );

  // Handles the page size changing.
  const handlePageSizeChange = useCallback(
    ({ pageSize, page }) => {
      gotoPage(0);
      setPageSize(pageSize);

      triggerOnPaginationChange({ page, pageSize });
    },
    [gotoPage, setPageSize, triggerOnPaginationChange],
  );

  return (
    <If condition={pagination && !loading}>
      <Pagination
        currentPage={pageIndex + 1}
        total={pageSize * pageCount}
        size={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </If>
  );
}
