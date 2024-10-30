import { useState } from 'react';

import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';

import { TFeedbackItem } from '@/lib/types';

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

type VoteType = 'initial' | 'upvote' | 'downvote';

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  const {
    upvoteCount: initialUpvoteCount,
    badgeLetter,
    company,
    text,
    daysAgo,
  } = feedbackItem;

  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [voteType, setVoteType] = useState<VoteType>('initial');

  const feedbackStatus = daysAgo === 0 ? 'NEW' : `${daysAgo}d`;

  const feedbackItemClassName = `feedback ${open ? 'feedback--expand' : ''}`;

  const upvoteButtonTitle =
    voteType === 'initial'
      ? 'Upvote this feedback'
      : 'You have upvoted this feedback';

  const downvoteButtonTitle =
    voteType === 'initial'
      ? 'Downvote this feedback'
      : 'You have downvoted this feedback';

  const handleUpvoteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (voteType === 'initial') {
      setUpvoteCount((previousCount) => ++previousCount);
      setVoteType('upvote');
    }

    if (voteType === 'upvote') {
      setUpvoteCount((previousCount) => --previousCount);
      setVoteType('initial');
    }
  };

  const handleDownvoteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (voteType === 'initial') {
      setUpvoteCount((previousCount) => --previousCount);
      setVoteType('downvote');
    }

    if (voteType === 'downvote') {
      setUpvoteCount((previousCount) => ++previousCount);
      setVoteType('initial');
    }
  };

  return (
    <li
      className={feedbackItemClassName}
      onClick={() => setOpen((previousValue) => !previousValue)}
    >
      <section>
        <button
          onClick={handleUpvoteClick}
          title={upvoteButtonTitle}
          disabled={voteType === 'downvote'}
          className={voteType === 'upvote' ? 'active-vote-btn' : ''}
        >
          <TriangleUpIcon />
        </button>

        <span>{upvoteCount}</span>

        <button
          onClick={handleDownvoteClick}
          title={downvoteButtonTitle}
          disabled={voteType === 'upvote'}
          className={voteType === 'downvote' ? 'active-vote-btn' : ''}
        >
          <TriangleDownIcon />
        </button>
      </section>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{feedbackStatus}</p>
    </li>
  );
};

export default FeedbackItem;
