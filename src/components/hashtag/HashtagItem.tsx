type HashtagItemProps = {
  capitalizedCompanyName: string;
};

const HashtagItem = ({ capitalizedCompanyName }: HashtagItemProps) => (
  <li key={capitalizedCompanyName}>
    <button>#{capitalizedCompanyName}</button>
  </li>
);

export default HashtagItem;
