import HashtagItem from '@/components/hashtag/HashtagItem';

type HashtagListProps = {
  companyList: string[];
};

const HashtagList = ({ companyList }: HashtagListProps) => {
  if (companyList.length === 0) return null;

  return (
    <ul className="hashtags">
      {companyList.map((companyName) => {
        const capitalizedCompanyName =
          companyName.substring(0, 1).toUpperCase() + companyName.substring(1);

        return <HashtagItem capitalizedCompanyName={capitalizedCompanyName} />;
      })}
    </ul>
  );
};

export default HashtagList;
