import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';

const RandomChar = () => {

	const [char, setChar] = useState(null);

	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)
			.then(onCharLoaded)
	}

		const content = !(loading || error || !char) ? <View char={char} /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;

		return (
			<div className="randomchar">
				{content}
				{spinner}
				{errorMessage}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button onClick={updateChar} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
}

const View = ({ char }) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	const noDescription = "Description does not exist for this character!";

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{!description ? noDescription : description.slice(0, 210) + "..."}
				</p>
				<div className="randomchar__btns">
					<a target="_blank" href={homepage} className="button button__main">
						<div className="inner">Homepage</div>
					</a>
					<a target="_blank" href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;