import Footer from '@/components/Footer';
import Container from '@/components/container/Container';
import HashtagList from '@/components/hashtag/HashtagList';

import FeedbackItemsContextProvider from '@/contexts/FeedbackItemsContextProvider';

function App() {
  return (
    <div className="app">
      <div className="main">
        <FeedbackItemsContextProvider>
          <Container />
        </FeedbackItemsContextProvider>

        <HashtagList />
      </div>

      <Footer />
    </div>
  );
}

export default App;
