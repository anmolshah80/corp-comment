import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import FeedbackItem from '@/components/container/feedback/FeedbackItem';

import { useAppContext, useFeedbackItemsContext } from '@/lib/hooks';
import { TFeedbackItem } from '@/lib/types';

type RenderFeedbackItemsProps = {
  filteredFeedbackItems: TFeedbackItem[];
};

const RenderFeedbackItems = ({
  filteredFeedbackItems,
}: RenderFeedbackItemsProps) => {
  if (filteredFeedbackItems.length === 0) return null;

  return filteredFeedbackItems.map((feedbackItem) => (
    <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
  ));
};

const FeedbackList = () => {
  const { filteredFeedbackItems } = useAppContext('FeedbackList');
  const { loading, errorMessage } = useFeedbackItemsContext('FeedbackList');

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
      <RenderFeedbackItems filteredFeedbackItems={filteredFeedbackItems} />
    </ol>
  );
};

export default FeedbackList;
