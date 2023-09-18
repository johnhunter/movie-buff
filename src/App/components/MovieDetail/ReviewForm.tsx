import { FC, useState } from 'react';
import css from './MovieDetail.module.css';

interface ReviewForm {
  disabled?: boolean;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

const ReviewForm: FC<ReviewForm> = ({
  initialValue = '',
  onSubmit,
  disabled,
}) => {
  const [value, setValue] = useState(initialValue);
  const placeholder = disabled
    ? 'Mark the movie as viewed before adding a review'
    : 'Add your own review for this movie';

  return (
    <div className={css.review}>
      <h3>Review</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
        disabled={disabled}
      ></textarea>
      <div>
        <button disabled={disabled} onClick={() => onSubmit(value)}>
          Save review
        </button>{' '}
        <button disabled={disabled} onClick={() => setValue(initialValue)}>
          Cancel changes
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
