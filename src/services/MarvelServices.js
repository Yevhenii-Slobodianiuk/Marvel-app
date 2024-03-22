import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apikey = 'apikey=0b16f2ffd7429e208117962440421f77';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
		return res.data.results.map(_transformCharacter)
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
		return res.data.results.map(_transformComics)
	}

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
		return _transformComics(res.data.results[0])
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apikey}`);
		return res.data.results.map(_transformCharacter)
	}

	const _transformCharacter = (char) => {
		return {
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		}
	}

	const _transformComics = (comics) => {
		return {
			title: comics.title,
			price: comics.prices[0].price,
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			id: comics.id,
			url: comics.urls[0].url,
			description: comics.description,
			pageCount: comics.pageCount,
			language: comics.textObjects.language || "en-US"
		}
	}

	return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterByName }
}

export default useMarvelService;