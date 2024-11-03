export type VoteType = 'initial' | 'upvote' | 'downvote';

export type TFeedbackItem = {
  id: number;
  upvoteCount: number;
  voteType: VoteType;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};
