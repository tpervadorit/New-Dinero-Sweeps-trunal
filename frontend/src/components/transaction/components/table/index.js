import { getDateTime } from '@/lib/utils';

const ACTION_TYPE_MAPPING = {
  casino_bet: 'Bet',
  casino_win: 'Win',
  claim_chatrain: 'Claim',
  emit_chatrain: 'Emit',
  send_tip: 'Send',
  receive_tip: 'Receive',
  purchase: 'Purchase',
  redeem: 'Redeem',
  bonus_drop: 'Bonus Drop',
  bonus_deposit: 'Bonus Deposit',
  welcome_bonus: 'Welcome Bonus',
  bonus_tier: 'Bonus Tier',
  bonus_referral: 'Bonus Referral',
  bonus_rackback: 'Bonus Rackback',
  faucet_awail: 'Faucet Awail',
};
const Table = ({ controls = [], data = [] }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-500';
      case 'Success':
        return 'text-green-500';
      case 'Reject':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const renderValue = (item, value) => {
    const { formatType, label } = item || {};

    switch (formatType || label) {
      case 'date':
        return getDateTime(value);
      case 'actionType':
        return ACTION_TYPE_MAPPING?.[value];
      case 'Purpose':
        return ACTION_TYPE_MAPPING?.[value];
      default:
        return value;
    }
  };

  return (
    <div
      className="rounded-lg overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <table className="min-w-max w-full border-collapse ">
        {/* Table Header */}
        <thead>
          <tr className="text-gray-300 text-base font-semibold tracking-wide">
            {controls.map((item, index) => (
              <th
                key={index}
                className="px-4 py-3 text-center whitespace-nowrap text-sm sm:text-base"
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {controls.map((item, colIndex) => {
                const value = row[item.value];
                return (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-xs sm:text-sm text-center whitespace-nowrap sm:text ${
                      item?.value === 'status'
                        ? getStatusClass(value)
                        : 'text-gray-200'
                    }`}
                  >
                    {renderValue(item, value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
