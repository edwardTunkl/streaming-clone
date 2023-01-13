import ReactPlayer from 'react-player/lazy';
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import { FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import { playerUrl } from '../constants/movie';
import { deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

import useMovies from '../hooks/useMovies';

interface Props {
  trailer: string;
}

function ModalPlayer({ trailer }: Props) {
  const [muted, setMuted] = useState(true);
  const { user, movie, addedToList } = useMovies();

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  };

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!));

      toast(`${movie?.title || movie?.original_name} has been removed from My List`, {
        duration: 8000,
        style: toastStyle,
      });
    } else {
      await setDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!), {
        ...movie,
      });

      toast(`${movie?.title || movie?.original_name} has been added to My List.`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };
  return (
    <div className='relative pt-[56.25%]'>
      <ReactPlayer
        url={`${playerUrl}${trailer}`}
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: '0', left: '0' }}
        playing
        muted={muted}
      />
      <Toaster position='bottom-center' />
      <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
        <div className='flex space-x-2'>
          <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
            <FaPlay className='h-7 w-7 text-black' />
            Play
          </button>

          <button className='modalButton' onClick={handleList}>
            {addedToList ? <CheckIcon className='h-7 w-7' /> : <PlusIcon className='h-7 w-7' />}
          </button>

          <button className='modalButton'>
            <ThumbUpIcon className='h-7 w-7' />
          </button>
        </div>
        <button
          className='modalButton'
          onClick={() => {
            setMuted(!muted);
          }}
        >
          {muted ? <VolumeOffIcon className='h-6 w-6' /> : <VolumeUpIcon className='h-6 w-6' />}
        </button>
      </div>
    </div>
  );
}

export default ModalPlayer;
