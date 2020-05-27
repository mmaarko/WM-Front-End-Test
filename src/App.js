import React, {useState, useEffect} from 'react';
import './App.css';
import Box from './Box';

const App = () => {

	const [state , setState] = useState({
		data: '',
		notFirstRender: false,
		activeSelectOption: '',
	})

	/* Fetch the data on first render */
	useEffect(() => {

		const getUrl = 'http://www.mocky.io/v2/5e8465c23000008400cf4395';

		fetch(getUrl, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(response => {

			/* When data is here, we can construct our components. */

			/* Construct dropdown options */
			const dropdownOptions = response.contract_length.contract_length_options.map((item, index) => {
				return(
					<li key={index} value={item}>{item}</li>
				);
			});

			/* Get Preselected dropdown option value */
			const preselectedValue = response.contract_length.preselected_contract_length;

			/* Construct Box Component */
			const boxItems = response.items;
			const boxComponent = boxItems.map((item, index) => {

				return(
					<Box
						key={item.id}
						featured={item.is_featured}
						suggestionData={response.promo_text}
						index={index}
						itemsData={response.items}
						assets={response.assets}
						activeSelectOption={preselectedValue}
					/>
				);

			})

			/* Set fetched data in state property */
			setState( prevState => ({
				...prevState,

				boxComponent: boxComponent,
				activeSelectOption: preselectedValue,
				dropdownOptions: dropdownOptions,
				data: response,

			}))

		})

	}, [])


	useEffect(() => {

		/* Because this hook gets fired on very first render, all state variables are empty, we get an error. So 'notFirstRender' variable tells us if it is first render or not.

		Every time user change dropdown item, this hook is fired. */
		if (state.notFirstRender) {

			const boxComponent = state.data.items.map((item, index) => {

				return(
					<Box
						key={item.id}
						featured={item.is_featured}
						suggestionData={state.data.promo_text}
						index={index}
						itemsData={state.data.items}
						assets={state.data.assets}
						activeSelectOption={state.activeSelectOption}
					/>
				);
			})

			setState( prevState => ({
				...prevState,
				boxComponent: boxComponent,
			}))
		}

		setState( prevState => ({
			...prevState,
			notFirstRender: true,
		}));

	}, [state.activeSelectOption])

	/* Every time user change dropdown item, this function is fired. */
	const changeSelect = (e) => {

		/* All dropdown items needs to remove 'active' class */
		const allSiblings = e.target.parentNode.childNodes;

		allSiblings.forEach(item => {
			item.classList.remove('active');
		});

		/* Get value from selected dropdown item */
		const value = e.target.getAttribute('value')

		/* Add 'active' class */
		e.target.classList.add('active');
		e.target.parentNode.parentNode.classList.remove('open');

		/* Push active dropdown item to state so other components can use it */
		setState( prevState => ({
			...prevState,
			activeSelectOption: value,
		}));

	}

	/* Open Dropdown on click by adding 'open' class */
	const selectFunctionality = (e) => {

		/* Check if it is already open */
		if (e.target.parentNode.classList.contains('open')) {
			e.target.parentNode.classList.remove('open');
		} else {
			e.target.parentNode.classList.add('open');
		}

	}

	/* Make Layout */
	return (

			<div className="app-wrapper">
				<div className="container">

					<div className='w100'>
						<div className="dropdown">

							<span value={state.activeSelectOption} onClick={selectFunctionality}>{state.activeSelectOption}</span>

							<ul onClick={changeSelect}>
								{state.dropdownOptions}
							</ul>

						</div>
					</div>

					<div className="flex-container flex flex-wrap column-mobile align-bottom">
						{state.boxComponent}
					</div>

				</div>
			</div>

	);
}

export default App;
