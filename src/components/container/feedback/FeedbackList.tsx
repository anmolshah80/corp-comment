import { useMemo } from 'react';

import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import FeedbackItem from '@/components/container/feedback/FeedbackItem';

import { useFeedbackItemsStore } from '@/stores/feedbackItemsStore';

import { TFeedbackItem } from '@/lib/types';

type RenderFeedbackItemsProps = {
  filteredFeedbackItems: TFeedbackItem[];
};

const RenderFeedbackItems = ({
  filteredFeedbackItems,
}: RenderFeedbackItemsProps) =>
  filteredFeedbackItems.map((feedbackItem) => (
    <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
  ));

const FeedbackList = () => {
  const loading = useFeedbackItemsStore((state) => state.loading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const getFilteredFeedbackItems = useFeedbackItemsStore(
    (state) => state.getFilteredFeedbackItems,
  );
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const selectedCompanies = useFeedbackItemsStore(
    (state) => state.selectedCompanies,
  );

  const filteredFeedbackItems = useMemo(
    () => getFilteredFeedbackItems(),
    [feedbackItems, selectedCompanies],
  );

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

  if (filteredFeedbackItems.length === 0) return null;

  return (
    <ol className="feedback-list">
      <RenderFeedbackItems filteredFeedbackItems={filteredFeedbackItems} />
    </ol>
  );
};

export default FeedbackList;
