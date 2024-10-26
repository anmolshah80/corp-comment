import HashtagItem from '@/components/hashtag/HashtagItem';

type HashtagListProps = {
  uniqueCompanyNames: string[];
};

const HashtagList = ({ uniqueCompanyNames }: HashtagListProps) => {
  if (uniqueCompanyNames.length === 0) return null;

  return (
    <ul className="hashtags">
      {uniqueCompanyNames.map((companyName) => {
        const capitalizedCompanyName =
          companyName.substring(0, 1).toUpperCase() + companyName.substring(1);

        return (
          <HashtagItem
            key={capitalizedCompanyName}
            capitalizedCompanyName={capitalizedCompanyName}
          />
        );
      })}
    </ul>
  );
};

export default HashtagList;
