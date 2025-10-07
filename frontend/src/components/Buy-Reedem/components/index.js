import { cross } from '@/assets/svg';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from './tab';
import { useStateContext } from '@/store';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft } from 'lucide-react';
import { options } from '../constants';

const TAB_LABEL_MAPPING = {
  buy: 'Buy Transaction',
  redeem: 'Redeem Transaction',
  rains: 'Rain Transaction',
  tips: 'Tips Transaction',
  confirmBuy: 'Credit Issue? Ticket!',
};

const BuyReedem = ({ isOpen, handleClick, buttonType }) => {
  const { t } = useTranslation();

  const checkValidType = (type) => {
    if (['redeem', 'rains', 'tips'].includes(type)) {
      return type;
    } else {
      options[0].value;
    }
  };

  const [currentTab, setCurrentTab] = useState(checkValidType(buttonType));
  const [showTransactions, setShowTransactions] = useState(false);
  const router = useRouter();
  const { dispatch } = useStateContext();
  const isMobile = useIsMobile();
  const handleNavigate = () => {
    if (currentTab === 'confirmBuy') {
      router.push('/tickets');
      handleClick();
    } else {
      setShowTransactions(true);
      router.push(`/transactions?active=${currentTab}`);
    }
    if (isMobile) {
      dispatch({
        type: 'SET_RIGHT_PANEL',
        payload: false,
      });
    }
  };

  return (
    <>
      {!showTransactions && (
        <Dialog open={isOpen} onOpenChange={handleClick}>
          <DialogContent
            className="h-[500px] overflow-y-auto scrollable-Content scrollable-Content-new
          w-[90%] md:w-full max-w-lg min-h-[100px] mx-auto mb-6 rounded-xl border-none"
          >
            <DialogHeader className="flex flex-row justify-between items-center max-h-10">
              <div className="flex gap-3 items-center">
                <div
                  className="text-white cursor-pointer"
                  onClick={handleClick}
                >
                  <ChevronLeft />
                </div>
                <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
                  <DialogTitle>Deposit</DialogTitle>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p
                  className="text-green-500 font-semibold underline text-sm cursor-pointer"
                  onClick={handleNavigate}
                >
                  {TAB_LABEL_MAPPING[currentTab]}
                </p>
                <Image
                  src={cross}
                  alt="close icon"
                  onClick={handleClick}
                  className="invert hover:bg-gray-500 rounded-3xl"
                />
              </div>
            </DialogHeader>
            {currentTab === 'confirmBuy' ? (
              <div className="flex h-auto max-h-[600px]">
                <Tab
                  buttonType={buttonType}
                  onTabChange={setCurrentTab}
                  handleCloseDialog={handleClick}
                />
              </div>
            ) : (
              <div
                style={{
                  maxHeight: '32rem',
                  overflowY: 'auto',
                }}
                className="scrollable-Content scrollable-Content-new p-1"
              >
                <Tab
                  buttonType={buttonType}
                  onTabChange={setCurrentTab}
                  handleCloseDialog={handleClick}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BuyReedem;
