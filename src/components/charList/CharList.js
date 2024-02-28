import { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelServices';

class CharList extends Component {
	state = {
		charList: []
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateCharacters();
	}

	onCharsLoaded = (charList) => {
		this.setState({
				charList: charList
		})
	}

	updateCharacters = () => {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharsLoaded)
			.catch(error => console.log(error))
	}

	render() {
		const { charList } = this.state;

		const modifiedList = charList.map(char => {
			return (
				<li 
					key={char.id}
					onClick={() => this.props.onCharSelected(char.id)}
					className="char__item">
					<img src={char.thumbnail} alt={char.name} />
					<div className="char__name">{char.name}</div>
				</li>
			)
		})

		return (
			<div className="char__list">
				<ul className="char__grid">
					{modifiedList}
				</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;