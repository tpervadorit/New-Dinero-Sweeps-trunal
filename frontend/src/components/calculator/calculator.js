'use client';
import { useState } from 'react';
import './cal.css';
import { truncateDecimals } from '@/lib/utils';
import Image from 'next/image';
import { coins, usd } from '@/assets/svg';
import { useStateContext } from '@/store';

const Calculator = () => {
  const {
    state: { selectedCoin },
  } = useStateContext();
  const icon = selectedCoin === 'gold' ? coins : usd;
  const [income, setIncome] = useState({
    amount: null,
    pensions: null,
    benefits: null,
    other: null,
  });

  const [expenses, setExpenses] = useState({
    rent: null,
    utilities: null,
    loans: null,
    other: null,
  });

  const handleInputChange = (e, category, type) => {
    const value =
      e.target.value === '' ? null : parseFloat(e.target.value) || 0;

    if (category === 'income') {
      setIncome({ ...income, [type]: value });
    } else if (category === 'expenses') {
      setExpenses({ ...expenses, [type]: value });
    }
  };

  const handleClear = () => {
    setIncome({
      amount: null,
      pensions: null,
      benefits: null,
      other: null,
    });
    setExpenses({
      rent: null,
      utilities: null,
      loans: null,
      other: null,
    });
  };

  const totalIncome = Object.values(income).reduce((a, b) => a + (b || 0), 0);
  const totalExpenses = Object.values(expenses).reduce(
    (a, b) => a + (b || 0),
    0
  );
  return (
    <div className="calculator-container !p-0">
      <h2>Monthly Budget Calculator</h2>
      <p className="text-gray-200 text-sm mt-2">
        Your information is confidential and is not visible to Dinero Sweeps. We
        take privacy seriously and ensure that any data you enter remains secure
        and used only for its intended purpose.
      </p>
      <div className="form-container">
        <div className="income-section">
          <h3 className="text-gray-300 text-sm mt-2">
            Income
          </h3>
          {['amount', 'pensions', 'benefits', 'other'].map((type) => (
            <div
              key={type}
              className="input-group text-gray-300 text-sm mt-2"
            >
              <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={income[type] === null ? '' : income[type]}
                  onChange={(e) => handleInputChange(e, 'income', type)}
                  className="input-field no-spinner"
                />
                <Image
                  src={icon}
                  alt="icon"
                  height={20}
                  width={20}
                  className="absolute right-2"
                />
              </div>
            </div>
          ))}
          <div className="total-box text-gray-300 text-sm mt-2 grid gap-2">
            <label>Total Income</label>
            <div className="input-field bg-neutral-800 non-editable">
              <span>${truncateDecimals(totalIncome, 2)}</span>
              <Image
                src={icon}
                alt="icon"
                height={20}
                width={20}
                className="right-2"
              />
            </div>
          </div>
        </div>
        <div className="expenses-section">
          <h3 className="text-gray-300 text-sm mt-2">
            Expenses
          </h3>
          {['rent', 'utilities', 'loans', 'other'].map((type) => (
            <div
              key={type}
              className="input-group text-gray-300 text-sm mt-2"
            >
              <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={expenses[type] === null ? '' : expenses[type]}
                  onChange={(e) => handleInputChange(e, 'expenses', type)}
                  className="input-field no-spinner"
                />
                <Image
                  src={icon}
                  alt="icon"
                  height={20}
                  width={20}
                  className="absolute right-2"
                />
              </div>
            </div>
          ))}
          <div className="total-box text-gray-300 text-sm mt-2 grid gap-2">
            <label>Total Expenses</label>
            <div className="input-field non-editable">
              <span>${truncateDecimals(totalExpenses, 2)}</span>
              <Image
                src={icon}
                alt="icon"
                height={20}
                width={20}
                className="right-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 px-6 my-4 bg-neutral-800 rounded-lg">
        <span className="text-xl font-bold">Disposable income</span>
        <div className="flex gap-2">
          <span className="font-semibold mt-2 text-lg">
            ${truncateDecimals(totalIncome - totalExpenses, 2)}
          </span>
          <Image
            src={icon}
            alt="icon"
            height={20}
            width={20}
            className="right-2"
          />
        </div>
      </div>

      <button
        onClick={handleClear}
        className="clear-button bg-red-700"
      >
        Clear
      </button>
    </div>
  );
};

export default Calculator;
