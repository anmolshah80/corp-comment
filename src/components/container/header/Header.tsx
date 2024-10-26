import Pattern from '@/components/container/header/Pattern';
import Logo from '@/components/container/header/Logo';
import PageHeading from '@/components/container/header/PageHeading';
import FeedbackForm from '@/components/container/header/FeedbackForm';

type HeaderProps = {
  handleAddToList: (text: string) => void;
};

const Header = ({ handleAddToList }: HeaderProps) => {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddToList={handleAddToList} />
    </header>
  );
};

export default Header;
