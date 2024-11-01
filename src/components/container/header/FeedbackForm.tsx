import { useEffect, useRef, useState } from 'react';

import { useFeedbackItemsContext } from '@/lib/hooks';
import { MAX_CHARACTERS } from '@/lib/constants';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const { handleAddToList } = useFeedbackItemsContext('FeedbackForm');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const slashKeyCounterRef = useRef(0);

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

    if (text.includes('#') && text.length > 5) {
      setShowValidIndicator(true);

      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);

      setTimeout(() => setShowInvalidIndicator(false), 4000);

      return;
    }

    handleAddToList(text);

    setText('');
  };

  const formClassName = `form ${showValidIndicator ? 'form--valid' : ''} ${
    showInvalidIndicator ? 'form--invalid' : ''
  }`;

  useEffect(() => {
    const focusTextareaWithHotKey = (event: KeyboardEvent) => {
      if (event.key !== '/') return;

      if (textareaRef.current === null) return;

      // prevent adding the slash key in the textarea upon entering the slash key for the first time
      if (slashKeyCounterRef.current === 0) {
        event.preventDefault();

        textareaRef.current.focus();
        slashKeyCounterRef.current += 1;

        return;
      }

      textareaRef.current.focus();
    };

    document.addEventListener('keydown', focusTextareaWithHotKey);

    return () => {
      document.removeEventListener('keydown', focusTextareaWithHotKey);
    };
  }, []);

  return (
    <>
      <form className={formClassName} onSubmit={handleSubmit}>
        <textarea
          id="feedback-textarea"
          value={text}
          placeholder=""
          spellCheck={false}
          onChange={handleChange}
          ref={textareaRef}
          onBlur={() => (slashKeyCounterRef.current = 0)}
        />

        <label htmlFor="feedback-textarea">
          Enter your feedback here, remember to #hashtag the company. Enter{' '}
          <span className="slash-key">/</span> to start typing.
        </label>

        <div>
          <p className="u-italic">{remainingCharacters} characters remaining</p>
          <button>
            <span>Submit</span>
          </button>
        </div>
      </form>
      {showInvalidIndicator && (
        <p className="error-message--form">
          Either a hashtag is missing or the feedback is less than 5 characters
          long
        </p>
      )}
    </>
  );
};

export default FeedbackForm;
