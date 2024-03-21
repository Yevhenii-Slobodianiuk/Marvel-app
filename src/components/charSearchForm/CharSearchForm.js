import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import './charSearchForm.scss';

const CharSearchForm = () => {

	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					charName: "",
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required("This field is required!")
				})}
				onSubmit={values => console.log(JSON.stringify(values, null, 2))}
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
						// disabled={loading}
						>
							<div className="inner">find</div>
						</button>
					</div>
					<ErrorMessage className="char__search-error" name="charName" component="div" />
				</Form>
			</Formik>	
		</div>
	)
}

export default CharSearchForm;