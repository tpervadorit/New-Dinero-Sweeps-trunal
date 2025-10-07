import Tabs from '@/common/components/custom-tab-switch';
import React, { useEffect, useState } from 'react';
import { options } from '../../constants';
import Buy from '../buy';
import Rain from '../rain';
import Tips from '../tips';
import BuyRedeem from '../redeem/';
import ConfirmBuy from '../confirm-Buy';

const COMPONENT_MAPPING = {
  // buy: Buy,
  // confirmBuy: ConfirmBuy,
  redeem: BuyRedeem,
  rains: Rain,
  tips: Tips,
};

const Tab = ({ buttonType, onTabChange, handleCloseDialog }) => {
  const [active, setActive] = useState(options[0].value);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const Components = COMPONENT_MAPPING?.[active];
  useEffect(() => {
    if (buttonType) {
      if (['redeem', 'rains', 'tips'].includes(buttonType)) {
        setActive(buttonType);
      } else {
        setActive(options[0].value);
      }
    }
  }, [buttonType]);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(active);
    }
  }, [active, onTabChange]);
  return (
    <div className="flex justify-center items-center flex-col w-full">
      {active === 'confirmBuy' ? (
        ''
      ) : (
        <Tabs
          options={options}
          active={active}
          setActive={setActive}
          sliderClassNames="from-pink-500 to-pink-600"
          tabClassName={'bg-neutral-800'}
          deactiveTabColor="text-white"
        />
      )}
      {Components ? (
        <div className="w-full min-h-[300px]">
          <Components
            handleCloseDialog={handleCloseDialog}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            setActive={setActive}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Tab;
