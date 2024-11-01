import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/contexts/AppContextProvider';
import { FeedbackItemsContext } from '@/contexts/FeedbackItemsContextProvider';

import { URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

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

const useFeedbackItems = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { feedbackItems, setFeedbackItems } = useAppContext(
    'FeedbackItemsContextProvider',
  );

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(URL);

      if (response.ok) {
        const data = await response.json();

        setFeedbackItems(data.feedbacks);
        setLoading(false);
      } else {
        const { status } = response;

        handleErrorStatuses(status);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    errorMessage,
    feedbackItems,
    setFeedbackItems,
  };
};

export { useAppContext, useFeedbackItemsContext, useFeedbackItems };
