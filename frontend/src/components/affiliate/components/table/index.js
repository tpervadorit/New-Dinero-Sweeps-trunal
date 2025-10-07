'use strict';

import { cn, isEmpty } from '@/lib/utils';
import RefTableHeader from '../tableHeader';
import { noData } from '@/assets/png';
import Image from 'next/image';

const RefTable = ({ controls = [], data = [], activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col w-full text-gray-300 rounded-lg">
      <RefTableHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {isEmpty(data) ? (
        <div className="h-[300px]">
          <div
            className={`flex flex-col items-center mt-4 justify-center h-[300px]`}
          >
            <Image
              src={noData}
              alt="No data available"
              width={280}
              height={280}
              className="-mb-11"
            />
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            {/* Table Header */}
            <thead>
              <tr className="text-base font-semibold tracking-wide">
                {controls.map((item) => (
                  <th key={item.label} className="px-4 py-2 text-center">
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {data.map((valueItem, index) => (
                <tr key={index}>
                  {controls.map((item) => (
                    <td
                      key={item.label}
                      className={cn(
                        'px-4 py-2 text-center',
                        ['wageredAmount', 'earnedCommission']?.includes(
                          item.value
                        ) && 'text-green-500 font-medium'
                      )}
                    >
                      {valueItem?.[item?.value]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RefTable;
