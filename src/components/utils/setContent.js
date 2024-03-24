import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const setContent = (process, data, Component) => {
	switch (process) {
		case "waiting":
			return <Skeleton />;
			break;
		case "loading":
			return <Spinner />;
			break;
		case "confirmed":
			return <Component data={data} />;
			break;
		case "error":
			return <ErrorMessage />;
			break;
		default:
			throw new Error("Unexpected process state");
	}
}

export default setContent;