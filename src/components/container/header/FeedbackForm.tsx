import { useState } from 'react';

import { MAX_CHARACTERS } from '@/lib/constants';

type FeedbackFormProps = {
  handleAddToList: (text: string) => void;
};

const FeedbackForm = ({ handleAddToList }: FeedbackFormProps) => {
  const [text, setText] = useState('');

  const remainingCharacters = MAX_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;

    if (newText.length > MAX_CHARACTERS) {
      return;
    }

    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddToList(text);

    setText('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        id="feedback-textarea"
        value={text}
        placeholder=""
        spellCheck={false}
        onChange={handleChange}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{remainingCharacters} characters remaining</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
