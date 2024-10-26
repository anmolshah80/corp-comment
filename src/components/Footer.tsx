import logo from '@/assets/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <small>
        <p>
          <span>&copy; {currentYear}</span> <img src={logo} alt="logo" />
        </p>
      </small>
    </footer>
  );
};

export default Footer;
