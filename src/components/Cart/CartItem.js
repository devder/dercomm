import React from "react";
import useStyles from "../../styles/cartItem-styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) {
	const classes = useStyles();

	const handleRemove = () => {
		onRemoveFromCart(item.id);
	};
	return (
		<Card>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button
						type="button"
						size="small"
						onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
					>
						-
					</Button>
					<Typography>&nbsp;{item.quantity}&nbsp;</Typography>
					<Button
						type="button"
						size="small"
						onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
					>
						+
					</Button>
				</div>
				<Button
					type="button"
					variant="contained"
					color="secondary"
					size="small"
					onClick={handleRemove}
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
}

export default CartItem;
