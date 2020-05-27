import React from 'react';
import './App.css';

function Headline(props) {

	return (
		<div className="headline-box flex align-middle align-center section separator">
			<h1>{props.content}</h1>
		</div>
	);
}

export default Headline;
