import { BellIcon, SearchIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { userUrl } from '../constants/movie';
import useAuth from '../hooks/useAuth';

function HeaderRight() {
  const { logout } = useAuth();

  return (
    <div className='flex items-center space-x-4 text-sm font-light'>
      <SearchIcon className='hidden h-6 w-6 sm:inline' />
      <p className='hidden lg:inline'>Kids</p>
      <BellIcon className='h-6 w-6' />
      <Link href='/account'>
        <img src={userUrl} alt='profile' className='cursor-pointer rounded' />
      </Link>
    </div>
  );
}

export default HeaderRight;
