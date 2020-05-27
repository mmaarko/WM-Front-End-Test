import React from 'react';
import './App.css';
import Headline from './Headline';
import Television from './Television';
import Internet from './Internet';
import Price from './Price';
import Suggestion from './Suggestion';
import OrderButton from './OrderButton';

function Box(props) {

	/* Get all Items data */
	const itemsData = props.itemsData

	/* If component is labeled as 'Featured' it will have one additional component and element class */
	const featured = props.featured ? ('featured') : (null)

	return (

		<div className={`box max33 margin-left ${featured ? "featured" : ""}`}>

			{props.featured ? (
				<Suggestion
					suggestionData={props.suggestionData}
				/>
			) : (null)}

			<Headline
				content={itemsData[props.index].name}
			/>

			{/* Get just 'tv' list items */}
			<Television
				content={itemsData[props.index].included.filter(item => item.product_category === 'tv')} img={props.assets.tv_category}
			/>

			{/* Get just 'net' list items */}
			<Internet
				index={itemsData[props.index]}
				activeSelectOption={props.activeSelectOption}
				content={itemsData[props.index].included.filter(item => item.product_category === 'net')}
				img={props.assets.net_category}
			/>

			<Price
				content={itemsData[props.index].prices.price_recurring[props.activeSelectOption]}
				old_price={itemsData[props.index].prices.old_price_recurring[props.activeSelectOption]}
				promo_text={itemsData[props.index].prices.old_price_promo_text}
			/>

			{/* Get active dropdown item, in order to know what user have ordered */}
			<OrderButton
				activeSelectOption={props.activeSelectOption}
			/>

		</div>
	);
}

export default Box;
