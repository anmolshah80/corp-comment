import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TFeedbackItem, VoteType } from '@/lib/types';
import { URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';
import initialData from '@/lib/data.json';

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
  upvoteButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feedbackID: number,
  ) => void;
  downvoteButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feedbackID: number,
  ) => void;
  postDataToServer: (newItem: TFeedbackItem) => Promise<void>;
  fetchFeedbackItemsFromJsonFile: (apiStatus: number) => TFeedbackItem[];
  fetchFeedbackItemsFromLocalStorage: () => undefined | string;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>()(
  persist(
    (set, get) => ({
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
              state.selectedCompanies.includes(
                feedbackItem.company.toLowerCase(),
              ),
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
          voteType: 'initial',
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

      upvoteButtonClick: (event, feedbackID) => {
        event.stopPropagation();

        // filter out the feedback item with the ID that matches the one in the argument
        const filteredFeedbackItems = get().feedbackItems.filter(
          (feedbackItem) => feedbackItem.id !== feedbackID,
        );

        const feedbackItem = get().feedbackItems.find(
          (feedbackItem) => feedbackItem.id === feedbackID,
        );

        if (!feedbackItem) return;

        const { voteType, upvoteCount } = feedbackItem;

        if (voteType === 'initial') {
          const upvotedFeedbackItem = {
            ...feedbackItem,
            upvoteCount: upvoteCount + 1,
            voteType: 'upvote' as VoteType,
          };

          const newFeedbackItems = [
            ...filteredFeedbackItems,
            upvotedFeedbackItem,
          ].sort((a, b) => b.upvoteCount - a.upvoteCount);

          set(() => ({
            feedbackItems: newFeedbackItems,
          }));
        }

        if (voteType === 'upvote') {
          set(() => {
            const upvotedFeedbackItem = {
              ...feedbackItem,
              upvoteCount: upvoteCount - 1,
              voteType: 'initial' as VoteType,
            };

            const newFeedbackItems = [
              ...filteredFeedbackItems,
              upvotedFeedbackItem,
            ].sort((a, b) => b.upvoteCount - a.upvoteCount);

            return {
              feedbackItems: newFeedbackItems,
            };
          });
        }
      },

      downvoteButtonClick: (event, feedbackID) => {
        event.stopPropagation();

        // filter out the feedback item with the ID that matches the one in the argument
        const filteredFeedbackItems = get().feedbackItems.filter(
          (feedbackItem) => feedbackItem.id !== feedbackID,
        );

        const feedbackItem = get().feedbackItems.find(
          (feedbackItem) => feedbackItem.id === feedbackID,
        );

        if (!feedbackItem) return;

        const { voteType, upvoteCount } = feedbackItem;

        if (voteType === 'initial') {
          const downvotedFeedbackItem = {
            ...feedbackItem,
            upvoteCount: upvoteCount - 1,
            voteType: 'downvote' as VoteType,
          };

          const newFeedbackItems = [
            ...filteredFeedbackItems,
            downvotedFeedbackItem,
          ].sort((a, b) => b.upvoteCount - a.upvoteCount);

          set(() => ({
            feedbackItems: newFeedbackItems,
          }));
        }

        if (voteType === 'downvote') {
          const downvotedFeedbackItem = {
            ...feedbackItem,
            upvoteCount: upvoteCount + 1,
            voteType: 'initial' as VoteType,
          };

          const newFeedbackItems = [
            ...filteredFeedbackItems,
            downvotedFeedbackItem,
          ].sort((a, b) => b.upvoteCount - a.upvoteCount);

          set(() => ({
            feedbackItems: newFeedbackItems,
          }));
        }
      },

      postDataToServer: async (newItem) => {
        try {
          // remove the voteType property from the newItem object and save the remaining properties in the responseBody object
          const { voteType: _, ...responseBody } = newItem;

          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseBody),
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

      fetchFeedbackItemsFromJsonFile: (apiStatus) => {
        if (
          !initialData ||
          !initialData.feedbacks ||
          initialData.feedbacks.length === 0
        ) {
          handleErrorStatuses(apiStatus);
        }

        const initialFeedbacks = initialData.feedbacks.map((feedbackItem) => ({
          ...feedbackItem,
          voteType: 'initial' as VoteType,
        }));

        return initialFeedbacks;
      },

      fetchFeedbackItemsFromLocalStorage: () => {
        const localStorageData = localStorage.getItem('corp-comment-feedbacks');

        if (!localStorageData) return;

        const {
          state: { feedbackItems },
        } = JSON.parse(localStorageData);

        if (!feedbackItems || feedbackItems.length === 0) {
          set(() => ({
            loading: false,
          }));

          return;
        }

        set(() => ({
          feedbackItems,
          loading: false,
        }));

        return 'data found in localStorage';
      },

      fetchFeedbackItems: async () => {
        set(() => ({
          loading: true,
          errorMessage: '',
        }));

        const res = get().fetchFeedbackItemsFromLocalStorage();

        // since data is already present in localStorage so the api call is not required to fetch the data again
        if (res === 'data found in localStorage') {
          return;
        }

        try {
          const response = await fetch(URL);

          if (response.ok) {
            const data = await response.json();
            set(() => {
              const feedbackItems = data.feedbacks.map(
                (feedbackItem: TFeedbackItem) => ({
                  ...feedbackItem,
                  voteType: 'initial',
                }),
              );

              return {
                feedbackItems,
              };
            });
          } else {
            const { status } = response;

            const initialFeedbackItems =
              get().fetchFeedbackItemsFromJsonFile(status);

            set(() => ({
              feedbackItems: initialFeedbackItems,
            }));
          }

          set(() => ({
            loading: false,
          }));
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
    }),
    {
      name: 'corp-comment-feedbacks',
    },
  ),
);
