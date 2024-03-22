import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SinglePageLayout from "../singlePageLayout/SinglePageLayout";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"))

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
								<Route path=":id" element={<SinglePage Component={SinglePageLayout} dataType='comic' />} />
							</Route>
							<Route path="*" element={<Page404 />} />
							<Route path="characters/:id" element={<SinglePage Component={SinglePageLayout} dataType='character' />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App;