import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = ({ Component }) => {
	const { comicId } = useParams();
	const [comic, setComic] = useState(null);

	const { loading, error, getComics, clearError } = useMarvelService();

	useEffect(() => {
		updateComic()
	}, [comicId])

	const onComicLoaded = (comic) => {
		setComic(comic);
	}

	const updateComic = () => {
		clearError();
		getComics(comicId)
			.then(onComicLoaded)
	}

	const content = !(loading || error || !comic) ? <Component data={comic} /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;

	return (
		<>
			{content}
			{errorMessage}
			{spinner}
		</>
	)
}

export default SingleComicPage;