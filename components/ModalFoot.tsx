import { useRecoilState } from 'recoil';
import { movieState } from '../atoms/modalAtoms';
import { Genre } from '../typings';

interface Props {
  genres: Genre[];
}

function ModalFoot({ genres }: Props) {
  const [movie, setMovie] = useRecoilState(movieState);

  return (
    <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
      <div className='space-y-6 text-lg'>
        <div className='flex items-center space-x-2 text-sm'>
          <p className='font-semibold text-green-400'>
            {(Math.round(movie!.vote_average * 10 * 100) / 100).toFixed(0)}% Match
          </p>
          <p className='font-light'>{movie?.release_date || movie?.first_air_date}</p>
          <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>HD</div>
        </div>

        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
          <p className='w-5/6'>{movie?.overview}</p>
          <div className='flex flex-col space-y-3 text-sm'>
            <div>
              <span className='text-[gray]'>Genres: </span> {genres.map((genre) => genre.name).join(', ')}
            </div>

            <div>
              <span className='text-[#gray]'>Original Language: </span>
              {movie?.original_language}
            </div>

            <div>
              <span className='text-[gray]'>Total votes: </span>
              {movie?.vote_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFoot;
