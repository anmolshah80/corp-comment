import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import FeedbackItem from '@/components/container/feedback/FeedbackItem';

import { TFeedbackItem } from '@/lib/types';

type RenderFeedbackItemsProps = {
  feedbackItems: TFeedbackItem[];
};

type FeedbackListProps = {
  loading: boolean;
  errorMessage: string;
  feedbackItems: TFeedbackItem[];
};

const RenderFeedbackItems = ({ feedbackItems }: RenderFeedbackItemsProps) => {
  if (feedbackItems.length === 0) return null;

  return feedbackItems.map((feedbackItem) => (
    <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
  ));
};

const FeedbackList = ({
  feedbackItems,
  loading,
  errorMessage,
}: FeedbackListProps) => {
  if (loading) {
    return (
      <ol className="feedback-list">
        <Spinner />
      </ol>
    );
  }

  if (errorMessage) {
    return (
      <ol className="feedback-list">
        <ErrorMessage message={errorMessage} />
      </ol>
    );
  }

  return (
    <ol className="feedback-list">
      <RenderFeedbackItems feedbackItems={feedbackItems} />
    </ol>
  );
};

export default FeedbackList;
