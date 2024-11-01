import { CrossCircledIcon } from '@radix-ui/react-icons';

import HashtagItem from '@/components/hashtag/HashtagItem';

import { useAppContext } from '@/lib/hooks';
import { capitalizeCompanyName } from '@/lib/utils';

type HashtagListFiltersProps = {
  selectedCompanies: string[];
  handleRemoveSelectedCompany: (company: string) => void;
};

const HashtagListFilters = ({
  selectedCompanies,
  handleRemoveSelectedCompany,
}: HashtagListFiltersProps) => {
  if (selectedCompanies.length === 0) return null;

  return (
    <ul className="hashtag-filters">
      {selectedCompanies.length >= 3 && (
        <li>
          <button>
            Remove All Filters{' '}
            <CrossCircledIcon
              className="cross-circled-icon"
              onClick={() => handleRemoveSelectedCompany('all')}
            />
          </button>
        </li>
      )}

      {selectedCompanies.map((company, index) => {
        return (
          <li key={company + index}>
            <button>
              {capitalizeCompanyName(company)}{' '}
              <CrossCircledIcon
                className="cross-circled-icon"
                onClick={() => handleRemoveSelectedCompany(company)}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const HashtagList = () => {
  const {
    uniqueCompanyNames,
    selectedCompanies,
    handleSelectCompany,
    handleRemoveSelectedCompany,
  } = useAppContext('HashtagList');

  if (uniqueCompanyNames.length === 0 && selectedCompanies.length === 0)
    return null;

  return (
    <div className="hashtags">
      <h2 className="filters-header">Filters</h2>
      <HashtagListFilters
        selectedCompanies={selectedCompanies}
        handleRemoveSelectedCompany={handleRemoveSelectedCompany}
      />
      <ul>
        {uniqueCompanyNames.map((companyName) => {
          const capitalizedCompanyName = capitalizeCompanyName(companyName);

          return (
            <HashtagItem
              key={capitalizedCompanyName}
              capitalizedCompanyName={capitalizedCompanyName}
              handleSelectCompany={handleSelectCompany}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default HashtagList;
