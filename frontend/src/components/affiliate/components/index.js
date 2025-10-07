'use client';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import PanelTabs from '@/common/components/panel-table';
import { TAB_CONTROLS } from '../constant';
import CustomSelect from '@/common/components/custom-select';
import Start from './getStart';
import Referrals from './referrals';
import Funds from './funds';
import { ChevronLeft } from 'lucide-react';
import { refferUser } from '@/assets/png';
import Image from 'next/image';

const COMPONENT_MAPPING = {
  getStart: Start,
  referrals: Referrals,
  funds: Funds,
};

const Affiliate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('active');
  const [activeTab, setActiveTab] = useState(active || TAB_CONTROLS[0].value);

  const onClose = () => {
    router.push('/');
  };

  const onTabChange = (value) => {
    router.push(`/affiliate/?active=${value}`);
    setActiveTab(value);
  };

  useEffect(() => {
    if (!active) {
      onTabChange(TAB_CONTROLS[0].value);
    }
  }, [active]);
  const Component = COMPONENT_MAPPING[activeTab];

  return (
    <div className={`${style.wrapContainer}`}>
      <section>
        <div className="flex gap-3 items-center mb-4">
          <div className="text-white cursor-pointer" onClick={onClose}>
            <ChevronLeft />
          </div>
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Affiliate
          </div>
        </div>
        <div className="block xl:hidden mb-2">
          <CustomSelect
            options={TAB_CONTROLS}
            selectedValue={activeTab}
            onValueChange={onTabChange}
          />
        </div>
        <div className="flex flex-col gap-5 xl:grid-flow-col items-start">
          <div className="hidden xl:block">
            <PanelTabs
              activeTab={activeTab}
              setActiveTab={onTabChange}
              tabControls={TAB_CONTROLS}
            />
          </div>
          {activeTab === 'getStart' && (
            <Image
              alt=""
              src={refferUser}
              width={300}
              height={300}
              className="mx-auto -mb-5"
            />
          )}
          <div className="bg-neutral-900 p-6 xl:tw-p-6 rounded-xl overflow-hidden w-full">
            {/* {active === 'getStart' ? <Start /> : null}
            {active === 'referrals' ? <Referrals /> : null}
            {active === 'funds' ? <Funds /> : null} */}
            <Component />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Affiliate;
