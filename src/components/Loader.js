import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	card: {
		maxWidth: 345,
		margin: theme.spacing(2),
	},
	media: {
		height: 190,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

export default function Loader() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{[1, 2, 3, 4].map((i) => (
					<Grid item key={i} xs={12} sm={6} md={4} lg={3}>
						<Card className={classes.card}>
							<CardHeader
								avatar={
									<Skeleton
										animation="wave"
										variant="circle"
										width={40}
										height={40}
									/>
								}
								action={null}
								title={
									<Skeleton
										animation="wave"
										height={10}
										width="80%"
										style={{ marginBottom: 6 }}
									/>
								}
								subheader={
									<Skeleton animation="wave" height={10} width="40%" />
								}
							/>

							<Skeleton
								animation="wave"
								variant="rect"
								className={classes.media}
							/>

							<CardContent>
								<>
									<Skeleton
										animation="wave"
										height={10}
										style={{ marginBottom: 6 }}
									/>
									<Skeleton animation="wave" height={10} width="80%" />
								</>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
