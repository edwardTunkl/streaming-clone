import { logoUrl } from '../constants/movie';
import BasicMenu from './BasicMenu';

function HeaderLeft() {
  return (
    <div className='flex items-center space-x-2 md:space-x-10'>
      <img src={logoUrl} width={100} height={100} className='cursor-pointer object-contain' />

      <BasicMenu />

      <ul className='hidden space-x-4 md:flex'>
        <li className='headerLink'>Home</li>
        <li className='headerLink'>TV Shows</li>
        <li className='headerLink'>Movies</li>
        <li className='headerLink'>New & Popular</li>
        <li className='headerLink'>My List</li>
      </ul>
    </div>
  );
}

export default HeaderLeft;
