import { useState } from "react";
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelServices";

import './charSearchForm.scss';

const CharSearchForm = () => {

	const [char, setChar] = useState(null)

	const { getCharacterByName, clearError, error, loading } = useMarvelService();

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = (name) => {
		clearError();
		getCharacterByName(name).then(onCharLoaded);
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const results = !char ? null : char.length > 0 ?
		<div className="char__search-wrapper">
			<div className="char__search-success">There is! Visit {char[0].name} page?</div>
			<Link to={`/characters/${char[0].id}`} className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div>:
		<div className="char__search-error">
			The character was not found. Check the name and try again!
		</div>;

	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					charName: "",
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required("This field is required!")
				})}
				onSubmit={values => updateChar(values.charName)}
			>
				<Form>
					<label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
					<div className="char__search-wrapper">
						<Field
							id="charName"
							name='charName'
							type='text'
							placeholder="Enter name" />
						<button
							type='submit'
							className="button button__main"
							disabled={loading}
						>
							<div className="inner">find</div>
						</button>
					</div>
					<FormikErrorMessage className="char__search-error" name="charName" component="div" />
				</Form>
			</Formik>
			{errorMessage}
			{results}
		</div>
	)
}

export default CharSearchForm;