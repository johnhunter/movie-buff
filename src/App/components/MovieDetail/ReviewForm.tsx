import { FC, useState } from 'react';
import css from './MovieDetail.module.css';

interface ReviewForm {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

const ReviewForm: FC<ReviewForm> = ({ initialValue = '', onSubmit }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={css.review}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      ></textarea>
      <div>
        <button onClick={() => onSubmit(value)}>Save review</button>{' '}
        <button onClick={() => setValue(initialValue)}>Cancel changes</button>
      </div>
    </div>
  );
};

export default ReviewForm;
