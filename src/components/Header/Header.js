import { FaDog } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Breeds list</h1>
      <FaDog className="header__icon" />
    </header>
  );
};

export default Header;
