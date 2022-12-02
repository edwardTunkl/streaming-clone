import Image from 'next/image';
import { Movie } from '../typings';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtoms';
import { thumbUrl } from '../constants/movie';

interface Props {
  movie: Movie;

  // With Firebase
  // Movie || DocumentData
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
    >
      <Image
        src={`${thumbUrl}${movie.backdrop_path || movie.poster_path}`}
        className='rounded-sm object-cover md:rounded'
        layout='fill'
        alt='image'
      />
    </div>
  );
}

export default Thumbnail;
