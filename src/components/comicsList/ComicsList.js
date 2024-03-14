import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './comicsList.scss';

const ComicsList = () => {

	const [offset, setOffset] = useState(0);
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { getAllComics, loading, error } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
	}

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setComicsList(comicsList => [...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(ended);
	}

	const renderComics = (arr) => {
		console.log(arr);
		let items = arr.map(item => {

			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<li key={item.id} className="comics__item">
					<a target="_blank" href={item.url}>
						<img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price ? `${item.price}$` : "Not AVALIABLE"}</div>
					</a>
				</li>
			)
		})

		return items;
	}

	const items = renderComics(comicsList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{spinner}
			<ul className="comics__grid">
				{errorMessage}
				{items}
			</ul>
			<button 
			onClick={() => onRequest(offset)}
			disabled={newItemLoading}
			style={{ 'display': comicsEnded ? 'none' : 'block' }}
			className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;