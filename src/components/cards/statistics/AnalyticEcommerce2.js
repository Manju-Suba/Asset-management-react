// material-ui
import { Grid, Stack } from '@mui/material';
import SoftwareSvg from 'assets/images/dashboard/SoftwareSvg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Box, Grid, Stack, Typography } from '@mui/material';

//import image

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

// eslint-disable-next-line react/prop-types
const AnalyticEcommerce2 = ({ AssetClass }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Stack>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Carousel responsive={responsive} infinite={false} draggable={false} swipeable={true} className="AssetClass_carousel">
            {Object.entries(AssetClass).map(([key, value]) => (
              // eslint-disable-next-line react/jsx-key
              <Link to={'/AssetList?class=' + key} role="button" className="Link-text-decoration-none">
                <Card key={key} className="assetClassCount">
                  <div className="w-100px">
                    <div className="mui-text-center">
                      <SoftwareSvg width="24px" mt="4" height="32px" />
                    </div>
                  </div>
                  <div className="cardbody">
                    <Typography gutterBottom variant="h5" component="div">
                      {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${key}`}
                    </Typography>
                  </div>
                </Card>
              </Link>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AnalyticEcommerce2;
