import { create } from 'zustand';

import { TFeedbackItem } from '@/lib/types';
import { URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

type Store = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  selectedCompanies: string[];
  getUniqueCompanyNames: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => void;
  selectCompany: (company: string) => void;
  removeSelectedCompany: (company: string) => void;
  postDataToServer: (newItem: TFeedbackItem) => Promise<void>;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>()((set, get) => ({
  feedbackItems: [],
  loading: false,
  errorMessage: '',
  selectedCompanies: [],

  getUniqueCompanyNames: () => {
    const state = get();

    return state.feedbackItems
      .map((feedbackItem) => feedbackItem.company.toLowerCase())
      .filter((company, index, array) => {
        return (
          !state.selectedCompanies.includes(company) &&
          array.indexOf(company) === index
        );
      });
  },

  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompanies.length > 0
      ? state.feedbackItems.filter((feedbackItem: TFeedbackItem) =>
          state.selectedCompanies.includes(feedbackItem.company.toLowerCase()),
        )
      : state.feedbackItems;
  },

  addItemToList: (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    get().postDataToServer(newItem);
  },

  selectCompany: (company: string) => {
    set((state) => ({
      selectedCompanies: [...state.selectedCompanies, company],
    }));
  },

  removeSelectedCompany: (company: string) => {
    if (company === 'all') {
      set(() => ({
        selectedCompanies: [],
      }));

      return;
    }

    set((state) => {
      const filteredCompanies = state.selectedCompanies.filter(
        (selectedCompany: string) => selectedCompany !== company,
      );

      return {
        selectedCompanies: filteredCompanies,
      };
    });
  },

  postDataToServer: async (newItem: TFeedbackItem) => {
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
  },

  fetchFeedbackItems: async () => {
    set(() => ({
      loading: true,
    }));

    try {
      const response = await fetch(URL);

      if (response.ok) {
        const data = await response.json();

        set(() => ({
          feedbackItems: data.feedbacks,
          loading: false,
        }));
      } else {
        const { status } = response;

        handleErrorStatuses(status);
      }
    } catch (error) {
      if (error instanceof Error) {
        set(() => ({
          errorMessage: error.message,
        }));
      }

      set(() => ({
        loading: false,
      }));
    }
  },
}));
