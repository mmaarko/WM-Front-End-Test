import React, {useEffect, useState} from 'react';
import './App.css';

function Internet(props) {

	const [state , setState] = useState({
		promotion: '',
		promotion_image: '',
		promo_text: '',
	})

	const listItems = props.content.map(item => {
		return(

			/* Make certain string parts bold and escape HTML */
			<li key={item.id}><div dangerouslySetInnerHTML={{__html: `${item.long_name.replace(item.attributes.attribute_value, "<b>" + item.attributes.attribute_value + "</b>")}` }} /></li>

		);
	});

	useEffect(() => {

		props.index.promotions.map(item => {

			item.discount_variations.map(innerItem => {

				if (innerItem === 'Ugovor 24 meseca') {

					const promo_text = item.promo_text;
					const promotion_image = item.promotion_image;

					setState( prevState => ({
						...prevState,
						promotion: innerItem,
						promotion_image: promotion_image,
						promo_text: promo_text
					}))

				}

			})
		});

	}, [props.activeSelectOption])

	return (
		<div className="section separator internet-box">
			<div className="flex column w100">
				<div className="flex align-middle column-middle-only w100">
					<img src={props.img} alt="" />
					<ul>{listItems}</ul>
				</div>

			{/* If active dropdown item is 'Ugovor 24 meseca' promotion section will be shown */}

				{state.promotion === props.activeSelectOption ? (
					<div className="flex between align-middle promotion">
						<img src={state.promotion_image} alt="" />
						<div className="w100" dangerouslySetInnerHTML={{__html: `${state.promo_text}` }} />
					</div>
				) : (null)}
			</div>
		</div>
	);
}

export default Internet;
