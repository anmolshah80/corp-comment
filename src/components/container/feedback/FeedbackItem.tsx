import { useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';

import { useFeedbackItemsStore } from '@/stores/feedbackItemsStore';

import { TFeedbackItem } from '@/lib/types';

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  const [open, setOpen] = useState(false);

  const handleUpvoteClick = useFeedbackItemsStore(
    (state) => state.upvoteButtonClick,
  );

  const handleDownvoteClick = useFeedbackItemsStore(
    (state) => state.downvoteButtonClick,
  );

  const { id, upvoteCount, voteType, badgeLetter, company, text, daysAgo } =
    feedbackItem;

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

  return (
    <li
      className={feedbackItemClassName}
      onClick={() => setOpen((previousValue) => !previousValue)}
    >
      <section>
        <button
          onClick={(event) => handleUpvoteClick(event, id)}
          title={upvoteButtonTitle}
          disabled={voteType === 'downvote'}
          className={voteType === 'upvote' ? 'active-vote-btn' : ''}
        >
          <TriangleUpIcon />
        </button>

        <span>{upvoteCount}</span>

        <button
          onClick={(event) => handleDownvoteClick(event, id)}
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
