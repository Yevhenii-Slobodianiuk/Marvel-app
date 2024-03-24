import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckPropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelServices';
import setContent from '../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { getCharacter, clearError, process, setProcess } = useMarvelService();

	useEffect(() => {
		updateChar()
	}, [])

	useEffect(() => {
		updateChar()
	}, [props.charId])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return false;
		}
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
			.then(() => setProcess("confirmed"))
	}

	return (
		<div className="char__info">
			{setContent(process, char, View)}
		</div>
	)
}

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;

	let comicsResult = null;

	if (comics.length > 0) {
		comicsResult = comics.map((item, i) => {
			let comicId = item.resourceURI.split("").slice(43).join("");
			return (
				<Link key={i} className="char__comics-item" to={`/comics/${comicId}`}>
					<li>
						{item.name}
					</li>
				</Link>
			)
		}).slice(0, 10)
	} else {
		comicsResult = "There is no comics for this character :("
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsResult}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: CheckPropTypes.number
}

export default CharInfo;