import './characterPageLayout.scss';

const CharacterPageLayout = ({ char }) => {

	const { name, description, thumbnail } = char;

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

export default CharacterPageLayout;

