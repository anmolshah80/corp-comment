import { createContext, useState, useMemo } from 'react';

import { TFeedbackItem } from '@/lib/types';

type AppContextProviderProps = {
  children: React.ReactNode;
};

type TAppContext = {
  feedbackItems: TFeedbackItem[];
  selectedCompanies: string[];
  filteredFeedbackItems: TFeedbackItem[];
  uniqueCompanyNames: string[];
  setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
  handleSelectCompany: (company: string) => void;
  handleRemoveSelectedCompany: (company: string) => void;
};

export const AppContext = createContext<TAppContext | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompanies.length > 0
        ? feedbackItems.filter((feedbackItem) =>
            selectedCompanies.includes(feedbackItem.company.toLowerCase()),
          )
        : feedbackItems,
    [selectedCompanies, feedbackItems],
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompanies((previousValues) => [...previousValues, company]);
  };

  const handleRemoveSelectedCompany = (company: string) => {
    if (company === 'all') {
      setSelectedCompanies([]);
      return;
    }

    setSelectedCompanies((previousValues) =>
      previousValues.filter((selectedCompany) => selectedCompany !== company),
    );
  };

  const uniqueCompanyNames = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.company.toLowerCase())
        .filter((company, index, array) => {
          return (
            !selectedCompanies.includes(company) &&
            array.indexOf(company) === index
          );
        }),
    [feedbackItems, selectedCompanies],
  );

  return (
    <AppContext.Provider
      value={{
        feedbackItems,
        selectedCompanies,
        filteredFeedbackItems,
        uniqueCompanyNames,
        setFeedbackItems,
        handleSelectCompany,
        handleRemoveSelectedCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
