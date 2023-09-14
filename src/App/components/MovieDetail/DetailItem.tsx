import { FC, ReactNode } from 'react';

interface DetailItemProps {
  label: string;
  content?: ReactNode;
}

const DetailItem: FC<DetailItemProps> = ({ label, content = 'N/A' }) => (
  <div>
    <b>{label} </b>
    <span>{content}</span>
  </div>
);

export default DetailItem;
