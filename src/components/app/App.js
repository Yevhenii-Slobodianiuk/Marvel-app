import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import CharacterPageLayout from "../characterPageLayout/CharacterPageLayout";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const CharacterPage = lazy(() => import("../pages/CharacterPage"))

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="comics">
								<Route index element={<ComicsPage />} />
								<Route path=":comicId" element={<SingleComicPage />} />
							</Route>
							<Route path="*" element={<Page404 />} />
							<Route path="characters/:charId" element={<CharacterPage Component={CharacterPageLayout}/>} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App;