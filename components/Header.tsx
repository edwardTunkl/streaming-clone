import Link from 'next/link';
import useScroll from '../hooks/useScroll';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

function Header() {
  const { isScrolled } = useScroll();

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
}

export default Header;
