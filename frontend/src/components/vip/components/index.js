'use client';
import { t } from 'i18next';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Tabs from '@/common/components/custom-tab';
import useVip from '@/components/vip/hook/useVip';
// import { options } from '../constants';
import ProgressSection from './progress';
// import Bonus from './bonus';
// import Rakeback from './rakeback';
const COMPONENT_MAPPING = {
  progress: ProgressSection,
  // bonus: Bonus,
  // rakeback: Rakeback,
};
const Vip = () => {
  const router = useRouter();
  const { active, setActive, t } = useVip();
  const Components = COMPONENT_MAPPING?.[active];
  const onClose = () => {
    router.push('/');
  };
  return (
    <>
      <div>
        <section>
          <div className="flex gap-3 items-center mb-4">
            <div className="text-white cursor-pointer" onClick={onClose}>
              <ChevronLeft />
            </div>
            <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
              {t('vip')}
            </div>
          </div>
          <div>
            {/* <div className="flex justify-center items-center flex-col w-full">
              <Tabs options={options} setActive={setActive} active={active} />
            </div> */}
            <Components />
          </div>
        </section>
      </div>
    </>
  );
};

export default Vip;
