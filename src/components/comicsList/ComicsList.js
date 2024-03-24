import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelServices";
import setListContent from "../utils/setListContent";

import './comicsList.scss';

const ComicsList = () => {

	const [offset, setOffset] = useState(0);
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { getAllComics, process, setProcess } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
			.then(() => setProcess("confirmed"))
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
		let items = arr.map((item, i) => {

			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<li key={i} className="comics__item">
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price ? `${item.price}$` : "Not AVALIABLE"}</div>
					</Link>
				</li>
			)
		})

		return (
			<ul className="comics__grid" style={{ width: "0 auto" }}>
				{items}
			</ul>
		)
	}

	return (
		<div className="comics__list">
				{setListContent(process, () => renderComics(comicsList), newItemLoading)}
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