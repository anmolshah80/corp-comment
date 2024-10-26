import { TriangleUpIcon } from '@radix-ui/react-icons';

import { TFeedbackItem } from '@/lib/types';

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;

  const feedbackAddedOn = daysAgo === 0 ? 'NEW' : `${daysAgo}d`;

  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{feedbackAddedOn}</p>
    </li>
  );
};

export default FeedbackItem;
