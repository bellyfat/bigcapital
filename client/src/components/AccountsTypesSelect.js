import React, { useCallback } from 'react';
import {
  ListSelect,
} from 'components';

export default function AccountsTypesSelect({
  accountsTypes,
  selectedTypeId,
  defaultSelectText = 'Select account type',
  onTypeSelected,
  ...restProps
}) {
  // Filters accounts types items.
  const filterAccountTypeItems = (query, accountType, _index, exactMatch) => {
    const normalizedTitle = accountType.name.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
  };

  // Handle item selected.
  const handleItemSelected = (accountType) => {
    onTypeSelected && onTypeSelected(accountType);
  };

  const items = accountsTypes.map((type) => ({
    id: type.id, name: type.name,
  }));

  return (
    <ListSelect
      items={items}
      selectedItemProp={'id'}
      selectedItem={selectedTypeId}
      labelProp={'name'}
      defaultText={defaultSelectText}
      onItemSelect={handleItemSelected}
      itemPredicate={filterAccountTypeItems}
      {...restProps}
    />
  );
}