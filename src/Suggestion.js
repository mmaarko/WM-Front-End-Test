import React from 'react';
import './App.css';

function Suggestion(props) {

	return (

		<div className="suggestion">
			<div className="flex align-center section separator">
				<span>{props.suggestionData}</span>
			</div>
		</div>
	);
}

export default Suggestion;
