import { Link } from 'react-router-dom';

import './singlePageLayout.scss';

const SinglePageLayout = ({ data }) => {
	if (Object.hasOwn(data, "title")) {
		const { description, title, pageCount, price, thumbnail, language } = data;
		return (
			<div className="single-comic">
				<img src={thumbnail} alt="x-men" className="single-comic__img" />
				<div className="single-comic__info">
					<h2 className="single-comic__name">{title}</h2>
					<p className="single-comic__descr">
						{description.length ? description : "Desciption does not exist"}
					</p>
					<p className="single-comic__descr">{`${pageCount} pages`}</p>
					<p className="single-comic__descr">Language: {language}</p>
					<div className="single-comic__price">{price}$</div>
				</div>
				<Link to="/comics" className="single-comic__back">Back to all</Link>
			</div>
		)
	} else {
		const { name, description, thumbnail } = data;
		return (
			<div className="single-comic">
				<img src={thumbnail} alt={name} className="single-comic__char-img" />
				<div className="single-comic__info">
					<h2 className="single-comic__name">{name}</h2>
					<p className="single-comic__descr">{description.length ? description : "Desciption does not exist"}</p>
				</div>
			</div>
		)
	}
}

export default SinglePageLayout;