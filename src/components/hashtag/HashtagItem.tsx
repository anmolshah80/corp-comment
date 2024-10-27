type HashtagItemProps = {
  capitalizedCompanyName: string;
  handleSelectCompany: (company: string) => void;
};

const HashtagItem = ({
  capitalizedCompanyName,
  handleSelectCompany,
}: HashtagItemProps) => (
  <li key={capitalizedCompanyName}>
    <button
      onClick={() => handleSelectCompany(capitalizedCompanyName.toLowerCase())}
    >
      #{capitalizedCompanyName}
    </button>
  </li>
);

export default HashtagItem;
