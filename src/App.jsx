import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import CointDetail from "./pages/CointDetail";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}  />
				<Route path="/coin/:id"  element={<CointDetail />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
