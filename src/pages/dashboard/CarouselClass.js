import React, { useState } from 'react';
import { Grid, IconButton, Box, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const CarouselClass = ({ items }) => {
	const [startIndex, setStartIndex] = useState(0);

	const handleNext = () => {
		setStartIndex((prevIndex) => prevIndex + 1);
	};

	const handlePrevious = () => {
		setStartIndex((prevIndex) => prevIndex - 1);
	};

	// Slice the items array based on the startIndex
	const visibleItems = items.slice(startIndex, startIndex + 4);

	return (
		<Grid container direction="column" alignItems="center" position="relative">
			<Grid
				item
				container
				justifyContent="flex-start"
				sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0px', zIndex: 2 }}
			>
				<IconButton onClick={handlePrevious} disabled={startIndex === 0} aria-label="Previous">
					<ChevronLeft />
				</IconButton>
			</Grid>
			<Grid container item justifyContent="center">
				{visibleItems.map((item, index) => (
					<Box key={`item_${startIndex + index}`} marginTop={2}>
						<Paper elevation={0}>{item}</Paper>
					</Box>
					// <Paper elevation={0} key={`item_${startIndex + index}`}>
					//     {' '}
					//     {item}
					// </Paper>

					// <Card key={`item_${startIndex + index}`} size="sm">
					//     <CardContent>{item}</CardContent>
					//     <l />
					// </Card>
					// <Grid
					//     key={`item_${startIndex + index}`}
					//     item
					//     sx={{
					//         p: 0,
					//         position: 'relative',
					//         zIndex: index === 0 ? 1 : 0 // Ensure the first item is below the buttons
					//     }}
					// >
					//     {item}
					// </Grid>
				))}
			</Grid>
			<Grid
				item
				container
				justifyContent="flex-end"
				sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0px', zIndex: 2 }}
			>
				{startIndex + 4 < items.length && (
					<IconButton onClick={handleNext} aria-label="Next">
						<ChevronRight />
					</IconButton>
				)}
			</Grid>
		</Grid>
	);
};

export default CarouselClass;
