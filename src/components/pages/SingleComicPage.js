import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
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

	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
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

const View = ({ comic }) => {
	const { description, title, pageCount, price, thumbnail, language } = comic;

	return (
		<div className="single-comic">
			<img src={thumbnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">
					{description.length ? description : "Desciption does not exist"}
				</p>
				<p className="single-comic__descr">{`${pageCount} pages`}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;