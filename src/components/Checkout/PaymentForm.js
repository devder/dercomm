import React from "react";
import {
	Typography,
	Button,
	Divider,
	Modal,
	Backdrop,
	Fade,
} from "@material-ui/core";
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentForm({
	checkoutToken,
	shippingData,
	backStep,
	onCaptureCheckout,
	nextStep,
	timeout,
}) {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = async function (e, elements, stripe) {
		e.preventDefault();
		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			console.log(error);
		} else {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				shipping: {
					name: "Primary",
					street: shippingData.address1,
					town_city: shippingData.city,
					county_state: shippingData.shippingSubdivision,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				fulfillment: { shipping_method: shippingData.shippingOption },
				payment: {
					gateway: "stripe",
					stripe: { payment_method_id: paymentMethod.id },
				},
			};

			onCaptureCheckout(checkoutToken.id, orderData);
			timeout();
			nextStep();
		}
	};

	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
				Payment Method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						// <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
						<form>
							<CardElement />
							<br />
							<br />
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<Button variant="outlined" onClick={backStep}>
									Back
								</Button>
								<Button
									// type="submit"
									onClick={handleOpen}
									variant="contained"
									disabled={!stripe}
									color="primary"
								>
									Pay {checkoutToken.live.subtotal.formatted_with_symbol}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">
							Congratulations {/* <Icon style={{ color: green[500] }}> */}
							<DoneAllIcon style={{ color: green[500] }} />
							{/* </Icon> */}
						</h2>
						<Typography variant="body2" color="textSecondary">
							This is as far as we go for now
						</Typography>
						<p id="transition-modal-description">
							Payment gateway was closed to prevent overloading the API without
							any valid transactions.
						</p>
						<a
							href="https://wa.me/2348060675869/?text=Hi%20Derick,%20I%20have%20a%20Web/Mobile%20App%20Project%20for%20you."
							target="_blank"
							rel="noreferrer"
							style={{ textDecoration: "none" }}
						>
							Contact me
						</a>{" "}
						{/* <Button
							color="primary"
							href="https://wa.me/2348060675869/?text=Hi%20Derick%20I%20have%20a%20Web/Mobile%20App%20Project%20for%20you."
							target="_blank"
							rel="noreferrer"
							size="small"
						>
							Contact me
						</Button> */}
						now to build your own Web App
						<Typography variant="subtitle2">
							Thanks for your time! 🙃
						</Typography>
					</div>
				</Fade>
			</Modal>
		</>
	);
}

export default PaymentForm;
