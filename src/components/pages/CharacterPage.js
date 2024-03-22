import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import AppBanner from "../appBanner/AppBanner";

const CharacterPage = ({Component}) => {
	const { charId } = useParams();
	const [ char, setChar ] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [charId])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const content = !(loading || error || !char) ? <Component data={char} /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;

	return (
		<>
			<AppBanner />
			<>
				{content}
				{errorMessage}
				{spinner}
			</>
		</>
	)
}

export default CharacterPage;