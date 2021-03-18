import React, { useState, useEffect } from "react";
import {
	Select,
	MenuItem,
	InputLabel,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

function AddressForm({ checkoutToken, next }) {
	const methods = useForm();
	const [shippingCountries, setshippingCountries] = useState([]);
	const [shippingCountry, setshippingCountry] = useState("");
	const [shippingSubDivs, setshippingSubDivs] = useState([]);
	const [shippingSubdivision, setshippingSubdivision] = useState("");
	const [shippingOptions, setshippingOptions] = useState([]);
	const [shippingOption, setshippingOption] = useState("");

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		setshippingCountries(countries);
		//get the keys of the countries and puts it in an array
		setshippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubDivs = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setshippingSubDivs(subdivisions);
		setshippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		region = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region }
		);
		setshippingOptions(options);
		setshippingOption(options[0].id);
	};
	// this yields an array of arrays with the inner arrays containing the key and value as [key, val]
	const gottenCountries = Object.entries(shippingCountries).map(
		([countryCode, countryName]) => ({
			id: countryCode,
			label: countryName,
		})
	);

	const gottenSubdivs = Object.entries(shippingSubDivs).map(
		([subdivCode, subdivName]) => ({
			id: subdivCode,
			label: subdivName,
		})
	);

	const gottenOptions = shippingOptions.map((option) => ({
		id: option.id,
		label: `${option.description} - (${option.price.formatted_with_symbol})`,
	}));

	useEffect(() => {
		let mounted = true;
		if (mounted) fetchShippingCountries(checkoutToken.id);
		return () => (mounted = false);
		//this dependency below was added to remove the warning, remove if you encounter bug
	}, [checkoutToken]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (shippingCountry) fetchSubDivs(shippingCountry);
		}
		return () => (mounted = false);
	}, [shippingCountry]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (shippingSubdivision)
				fetchShippingOptions(
					checkoutToken.id,
					shippingCountry,
					shippingSubdivision
				);
		}
		return () => (mounted = false);
	}, [shippingSubdivision, checkoutToken, shippingCountry]);

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						})
					)}
				>
					<Grid container spacing={3}>
						<FormInput name="firstname" label="First Name" />
						<FormInput name="lastname" label="Last Name" />
						<FormInput name="address1" label="Address" />
						<FormInput name="email" label="Email" />
						<FormInput name="city" label="City" />
						<FormInput name="zip" label="Zip / Postal Code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) => setshippingCountry(e.target.value)}
							>
								{gottenCountries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => setshippingSubdivision(e.target.value)}
							>
								{gottenSubdivs.map((subdiv) => (
									<MenuItem key={subdiv.id} value={subdiv.id}>
										{subdiv.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) => setshippingOption(e.target.value)}
							>
								{gottenOptions.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button
							component={Link}
							to="/cart"
							variant="outlined"
							color="secondary"
						>
							Back to Cart
						</Button>
						<Button type="submit" color="primary" variant="contained">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
}

export default AddressForm;
