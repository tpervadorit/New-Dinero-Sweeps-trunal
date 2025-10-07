'use client';
import { dice } from '@/assets/svg';
import CustomSelect from '@/common/components/custom-select';
import PanelTabs from '@/common/components/panel-table';
import Calculator from '@/components/calculator/calculator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResponsibleGaming_MAPPING, TAB_CONTROLS } from '../constant';
import ResponsibleGamingList from './responsiblegaming-listing';
import style from './style.module.scss';
import { ChevronLeft } from 'lucide-react';

const ResponsibleGaming = () => {
  const [activeTab, setActiveTab] = useState(TAB_CONTROLS[0].value);
  const router = useRouter();

  const onClose = () => {
    router.push('/');
  };
  useEffect(() => {
    if (activeTab === 'selfExclusion') {
      router.push('/setting?active=responsibleGambling');
    }
  }, [activeTab, router]);

  return (
    <div className={`${style.wrapContainer} bg-[hsl(var(--new-background))]`}>
      <section>
        <div className="flex gap-3 items-center mb-4">
          <div className="text-white cursor-pointer" onClick={onClose}>
            <ChevronLeft />
          </div>
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Responsible Gaming
          </div>
        </div>
        <div className="block xl:hidden mb-2">
          <CustomSelect
            options={TAB_CONTROLS}
            selectedValue={activeTab}
            onValueChange={setActiveTab}
          />
        </div>
        <div className="flex flex-col gap-5 xl:grid-flow-col items-start">
          <div className="hidden xl:block">
            <PanelTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabControls={TAB_CONTROLS}
            />
          </div>
          <div className="bg-neutral-900 p-6 xl:tw-p-6 rounded-xl overflow-hidden w-full">
            {!activeTab === null || activeTab === 'budgetCalculator' ? (
              <Calculator />
            ) : activeTab === 'selfExclusion' ? (
              ''
            ) : (
              <ResponsibleGamingList
                ResponsibleGamingData={ResponsibleGaming_MAPPING?.en[activeTab]}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsibleGaming;
