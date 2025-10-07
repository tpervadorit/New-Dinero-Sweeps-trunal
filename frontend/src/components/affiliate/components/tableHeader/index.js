'use strict';

import CustomSelect from '@/common/components/custom-select';
import { useStateContext } from '@/store';
import { SORT_OPTIONS } from '../../constant';

const RefTableHeader = ({ activeTab, setActiveTab }) => {
  const {
    state: { user },
  } = useStateContext();

  const onTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 pb-4">
        {/* Campaign Name Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-2">Referral Code</label>
          <div className="px-5 py-1.5 rounded-full bg-yellow-500 text-black border-0">
            {user ? user.username : '...'}
          </div>
        </div>

        {/* Sorted By Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-2">Sorted by</label>
          <CustomSelect
            options={SORT_OPTIONS}
            selectedValue={activeTab}
            onValueChange={onTabChange}
            className={'border-0'}
          />
        </div>
      </div>
    </>
  );
};
export default RefTableHeader;
