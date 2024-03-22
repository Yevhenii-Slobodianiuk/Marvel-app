import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SinglePage = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);

	const { loading, error, getComics, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateData()
	}, [id])

	const updateData = () => {
		clearError();

		switch (dataType) {
			case 'comic':
				getComics(id).then(onDataLoaded);
				break;
			case 'character':
				getCharacter(id).then(onDataLoaded);
		}
	}

	const onDataLoaded = (data) => {
		setData(data);
	}

	const content = !(loading || error || !data) ? <Component data={data} /> : null;
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

export default SinglePage;
