import { useRecoilState } from 'recoil';
import { movieState } from '../atoms/modalAtoms';
import { useEffect, useState } from 'react';
import { Element, Genre, Movie } from '../typings';
import useAuth from './useAuth';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function useMovies() {
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer');
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  //movies in users list
  useEffect(() => {
    if (user) {
      return onSnapshot(collection(db, 'customers', user.uid, 'myList'), (snapshot) => setMovies(snapshot.docs));
    }
  }, [db, movie?.id]);

  // check if movie in list
  useEffect(() => setAddedToList(movies.findIndex((result) => result.data().id === movie?.id) !== -1), [movies]);

  return { trailer, genres, movie, addedToList, user };
}
