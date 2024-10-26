import Header from '@/components/container/header/Header';
import FeedbackList from '@/components/container/feedback/FeedbackList';

import { TFeedbackItem } from '@/lib/types';

type ContainerProps = {
  loading: boolean;
  errorMessage: string;
  feedbackItems: Array<TFeedbackItem>;
  handleAddToList: (text: string) => void;
};

const Container = ({
  loading,
  errorMessage,
  feedbackItems,
  handleAddToList,
}: ContainerProps) => {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        loading={loading}
        errorMessage={errorMessage}
        feedbackItems={feedbackItems}
      />
    </main>
  );
};

export default Container;
