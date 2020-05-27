import React from 'react';
import './App.css';

function App(props) {

	return (
		<div className="section price-box">
			<div className="flex column-middle-only column-mobile-small">
				{props.old_price !== '' ? (<span className="strikethrough">{parseInt(props.old_price)} rsd/mes.</span>) : (null)}

				{/* Make price whole number */}
				<p>{parseInt(props.content)} rsd/mes.</p>
			</div>

			<div className="block description">

				{/* Escaping HTML */}
				{props.old_price !== '' ? (<div className="w100 block description" dangerouslySetInnerHTML={{__html: `${props.promo_text}` }} />) : (null)}
			</div>
		</div>
	);
}

export default App;
