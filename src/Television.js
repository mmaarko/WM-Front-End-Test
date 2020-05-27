import React from 'react';
import './App.css';

function Television(props) {

	const listItems = props.content.map(item => {

		return(

			/* Make certain string parts bold and escape HTML */
			<li key={item.id}><div dangerouslySetInnerHTML={{__html: `${item.long_name.replace(item.attributes.attribute_value, "<b>" + item.attributes.attribute_value + "</b>")}` }} /></li>

		);
	});

	return (
		<div className="section separator tv-section-box">
			<div className="flex align-middle column-middle-only w100">
				<img src={props.img} alt="" />
				<ul>{listItems}</ul>
			</div>
		</div>
	);
}

export default Television;
