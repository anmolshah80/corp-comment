import { useState, useEffect, createContext } from 'react';

import { useAppContext } from '@/lib/hooks';
import { TFeedbackItem } from '@/lib/types';
import { URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

type TFeedbackItemsContext = {
  loading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null,
);

const FeedbackItemsContextProvider = ({
  children,
}: FeedbackItemsContextProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { feedbackItems, setFeedbackItems } = useAppContext(
    'FeedbackItemsContextProvider',
  );

  const postDataToServer = async (newItem: TFeedbackItem) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Your feedback has been added!');
      } else {
        const { status } = response;

        handleErrorStatuses(status);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    // TODO: Show a toaster when the server responds with 201-Created status
  };

  const handleAddToList = (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: company,
      badgeLetter: company.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    postDataToServer(newItem);
  };

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

  return (
    <FeedbackItemsContext.Provider
      value={{
        loading,
        errorMessage,
        handleAddToList,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
};

export default FeedbackItemsContextProvider;
