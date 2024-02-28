import { Component } from 'react';

import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton"

import './charInfo.scss';

class CharInfo extends Component {

	state = {
		char: null,
		loading: false,
		error: false,
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({
			char: char,
			loading: false,
		});
	}

	onCharLoading = () => {
		this.setState({
			loading: true
		})
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	}

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return false;
		}
		this.onCharLoading();
		this.marvelService
			.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	render() {
		const { char, loading, error } = this.state;

		const skeleton = char || loading || error ? null : <Skeleton />
		const content = !(loading || error || !char) ? <View char={char} /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;

		return (
			<div className="char__info">
				{skeleton}
				{content}
				{errorMessage}
				{spinner}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
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
				{
					comics.map((item, i) => {
						return (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export default CharInfo;