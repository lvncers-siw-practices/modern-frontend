import "./App.css";

function App() {
	const handleClick = () => {
		console.log("クリックされました");
	};

	return (
		<div>
			<button onClick={handleClick}>クリック</button>
		</div>
	);
}

export default App;
