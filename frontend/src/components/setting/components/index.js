'use client';
import PanelTabs from '@/common/components/panel-table';
import style from './style.module.scss';
import { TAB_CONTROLS } from '../constant';
import { useState } from 'react';
import Profile from './profile';
import Email from './email';
import Password from './password';
import BonusDrop from './bonus-drop';
import TwoFactor from './two-factor';
import Avatar from './avatar';
import IgnoredUsers from './ignored-users';
import ResponsibleGambling from './responsible-gambling';
import Verify from './verify';
import Preferences from './preferences';
import CustomSelect from '@/common/components/custom-select';
import { useRouter, useSearchParams } from 'next/navigation';
import useGetUserDetail from '@/common/hook/useGetUserDeatil';
import { airdropEmail, bonusDrop } from '@/assets/png';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
const COMPONENT_MAPPING = {
  profile: Profile,
  email: Email,
  password: Password,
  bonusDrop: BonusDrop,
  twoFactor: TwoFactor,
  avatar: Avatar,
  ignoredUsers: IgnoredUsers,
  responsibleGambling: ResponsibleGambling,
  verify: Verify,
  preferences: Preferences,
};
const Setting = () => {
  const { userData, userLoading } = useGetUserDetail();

  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('active');
  const [activeTab, setActiveTab] = useState(active || TAB_CONTROLS[0].value);
  const COMPONENT = COMPONENT_MAPPING[activeTab] || null;
  const onClose = () => {
    router.push('/');
  };

  const onTabChange = (value) => {
    router.push(`/setting?active=${value}`);
    setActiveTab(value);
  };

  return (
    <div className={`${style.wrapContainer}`}>
      <section>
        <div className="flex gap-3 items-center mb-4">
          <div className="text-white cursor-pointer" onClick={onClose}>
            <ChevronLeft />
          </div>
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Profile
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
          {(activeTab === 'email' || activeTab === 'bonusDrop') && (
            <Image
              alt=""
              src={activeTab === 'email' ? airdropEmail : bonusDrop}
              width={300}
              height={300}
              className="mx-auto -mb-5"
            />
          )}
          <div className="bg-neutral-900 p-6 xl:tw-p-6 rounded-xl overflow-hidden w-full">
            {/* <Email /> */}
            {COMPONENT ? (
              <COMPONENT
                userData={userData}
                userLoading={userLoading}
                setActiveTab={setActiveTab}
              />
            ) : null}
            {/* <BonusDeop /> */}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Setting;
