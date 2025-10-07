'use client';
import { noTickets } from '@/assets/png';
import { chevronLeft, cross, tickets } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import useTicket from '../hook/useTicket';
// import CustomSelect from '@/common/components/custom-select';
// import { selectOptions } from '../constant';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import CreateTicket from './create-ticket';
import { isEmpty } from '@/lib/utils';
import TicketMessage from './ticket-message';
import { ChevronLeft } from 'lucide-react';

const Tickets = () => {
  const {
    createTicket,
    handleClick,
    handleClose,
    // dataLoading,
    ticketData,
    formatDate,
    handleTicketMessage,
    isTicketMessageOpen,
    ticketId,
    t,
  } = useTicket();

  return (
    <div className="pb-5">
      <div className="flex gap-3 items-center mb-4">
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            if (createTicket || isTicketMessageOpen) {
              isTicketMessageOpen ? handleTicketMessage(null) : handleClick();
            } else {
              handleClose();
            }
          }}
        >
          <ChevronLeft />
        </div>
        <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
          {t('tickets')}
        </div>
      </div>
      <div className="w-[95%] mx-auto py-5 bg-neutral-900 rounded-xl">
        <div
          className={`w-[93%] mx-auto flex items-center justify-center flex-col pb-3 rounded-sm`}
        >
          {!isTicketMessageOpen ? (
            createTicket ? (
              <CreateTicket handleClick={handleClick} />
            ) : (
              <>
                {isEmpty(ticketData) ? (
                  <div className="flex justify-center flex-col">
                    <Image
                      src={noTickets}
                      alt="no Data Ticket"
                      height={300}
                      width={300}
                      className="-mb-7"
                    />
                  </div>
                ) : (
                  <div className="w-[100%] px-2 py-2 mb-2">
                    <div className="flex justify-between mb-2 p-3">
                      <div className="font-bold text-lg text-white tracking-wide">
                        <p>{t('title')}</p>
                      </div>
                      <div className="font-bold text-lg text-white tracking-wide">
                        <p>{t('status')}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {ticketData?.map((ticket) => (
                        <div
                          key={ticket?.id}
                          className="flex justify-between items-center text-gray-400"
                        >
                          <div
                            className="cursor-pointer"
                            onClick={() => handleTicketMessage(ticket?.id)}
                          >
                            <div
                              className={`gap-2 ${ticket.status === 'closed' ? '' : 'text-yellow-400'}`}
                            >
                              <span> #[{ticket.id}]</span>
                              <span> {ticket.subject} </span>
                            </div>
                            <div>{formatDate(ticket.createdAt)}</div>
                          </div>
                          <div className="capitalize">{ticket.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleClick}
                  className="bg-red-500 p-5 hover:bg-red-600 cursor-pointer font-bold text-white rounded-full"
                >
                  {t('createNewTicket')}
                </Button>
              </>
            )
          ) : (
            <TicketMessage ticketId={ticketId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
