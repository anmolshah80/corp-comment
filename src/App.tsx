import { useState, useEffect } from 'react';

import Footer from '@/components/Footer';
import Container from '@/components/container/Container';
import HashtagList from '@/components/hashtag/HashtagList';

import { TFeedbackItem } from '@/lib/types';
import { URL } from '@/lib/constants';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyList = feedbackItems
    .map((feedbackItem) => feedbackItem.company.toLowerCase())
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    });

  const handleAddToList = async (text: string) => {
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

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    console.log('response: ', response);
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

        switch (status) {
          case 401:
            throw new Error('401, Unauthorized');
          case 404:
            throw new Error('404, Not Found');
          case 500:
            throw new Error('500, Internal Server Error');
          default:
            throw new Error(status.toString());
        }
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
    <div className="app">
      <Footer />

      <Container
        loading={loading}
        errorMessage={errorMessage}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList}
      />

      <HashtagList companyList={companyList} />
    </div>
  );
}

export default App;
