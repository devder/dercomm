import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../styles/product-styles";
import { Link } from "react-router-dom";

const Product = ({ classes, product, onAddToCart }) => {
	const handleAddToCart = () => {
		onAddToCart(product.id, 1);
	};

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.media.source}
				title={product.name}
				component={Link}
				to={`/info/${product.id}`}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography gutterBottom variant="h5">
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography
					variant="body2"
					color="textSecondary"
					dangerouslySetInnerHTML={{ __html: product.description }}
					component="p"
				/>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default withStyles(styles)(Product);
