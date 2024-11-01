import { useEffect } from 'react';

import Footer from '@/components/Footer';
import Container from '@/components/container/Container';
import HashtagList from '@/components/hashtag/HashtagList';

import { useFeedbackItemsStore } from '@/stores/feedbackItemsStore';

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems,
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <div className="main">
        <Container />

        <HashtagList />
      </div>

      <Footer />
    </div>
  );
}

export default App;
