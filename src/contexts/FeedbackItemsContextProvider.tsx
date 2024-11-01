import { createContext } from 'react';

import { useFeedbackItems } from '@/lib/hooks';
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
  const { loading, errorMessage, feedbackItems, setFeedbackItems } =
    useFeedbackItems();

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
        console.log('server response', response);
      } else {
        const { status } = response;

        handleErrorStatuses(status);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
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
