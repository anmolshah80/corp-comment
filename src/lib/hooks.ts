import { useContext } from 'react';

import { AppContext } from '@/contexts/AppContextProvider';
import { FeedbackItemsContext } from '@/contexts/FeedbackItemsContextProvider';

const useAppContext = (componentName: string) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      `AppContext is not defined in ${componentName}. Ensure that AppContextProvider is wrapping ${componentName}.`,
    );
  }

  return context;
};

const useFeedbackItemsContext = (componentName: string) => {
  const context = useContext(FeedbackItemsContext);

  if (!context) {
    throw new Error(
      `FeedbackItemsContext is not defined in ${componentName}. Ensure that FeedbackItemsContextProvider is wrapping ${componentName}.`,
    );
  }

  return context;
};

export { useAppContext, useFeedbackItemsContext };
