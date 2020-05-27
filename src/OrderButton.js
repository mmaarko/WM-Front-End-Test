import React from 'react';
import './App.css';

function OrderButton(props) {

	/* When button is clicked we get the information what user have ordered */
	const order = (e) => {
		e.preventDefault();

		alert('Naručili ste ' + props.activeSelectOption);
	}

	return (
		<div className="section order">
			<button onClick={order}>Naručite</button>
		</div>
	);
}

export default OrderButton;
