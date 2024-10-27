import { useState, useEffect, useMemo } from 'react';

import Footer from '@/components/Footer';
import Container from '@/components/container/Container';
import HashtagList from '@/components/hashtag/HashtagList';

import { TFeedbackItem } from '@/lib/types';
import { URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompanies.length > 0
        ? feedbackItems.filter((feedbackItem) =>
            selectedCompanies.includes(feedbackItem.company.toLowerCase()),
          )
        : feedbackItems,
    [selectedCompanies, feedbackItems],
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompanies((previousValues) => [...previousValues, company]);
  };

  const handleRemoveSelectedCompany = (company: string) => {
    if (company === 'all') {
      setSelectedCompanies([]);
      return;
    }

    setSelectedCompanies((previousValues) =>
      previousValues.filter((selectedCompany) => selectedCompany !== company),
    );
  };

  const uniqueCompanyNames = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.company.toLowerCase())
        .filter((company, index, array) => {
          return (
            !selectedCompanies.includes(company) &&
            array.indexOf(company) === index
          );
        }),
    [feedbackItems, selectedCompanies],
  );

  const postDataToServer = async (newItem: TFeedbackItem) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    // TODO: Show a toaster when the server responds with 201-Created status
    console.log('server response: ', response);
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
    <div className="app">
      <div className="main">
        <Container
          loading={loading}
          errorMessage={errorMessage}
          feedbackItems={filteredFeedbackItems}
          handleAddToList={handleAddToList}
        />

        <HashtagList
          uniqueCompanyNames={uniqueCompanyNames}
          selectedCompanies={selectedCompanies}
          handleSelectCompany={handleSelectCompany}
          handleRemoveSelectedCompany={handleRemoveSelectedCompany}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
