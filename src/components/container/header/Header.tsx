import Pattern from '@/components/container/header/Pattern';
import Logo from '@/components/container/header/Logo';
import PageHeading from '@/components/container/header/PageHeading';
import FeedbackForm from '@/components/container/header/FeedbackForm';

const Header = () => {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
};

export default Header;
