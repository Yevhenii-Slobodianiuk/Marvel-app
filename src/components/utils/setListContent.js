import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setListContent = (process, Component, newItemLoading  ) => {
	switch (process) {
		case "waiting":
			return <Spinner />;
		case "loading":
			return newItemLoading ? <Component/> : <Spinner />;
		case "confirmed":
			return <Component/>;
		case "error":
			return <ErrorMessage />;
		default:
			throw new Error("Unexpected process state");
	}
}

export default setListContent;