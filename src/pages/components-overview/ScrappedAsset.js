// material-ui

import ComponentSkeleton from './ComponentSkeleton';

import { Card } from '../../../node_modules/@mui/material/index';
import ScrappedAssetHeader from './UserAssets/ScrappedAssetHeader';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const ScrappedAsset = () => (
  <ComponentSkeleton>
    <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
      <ScrappedAssetHeader />
    </Card>
  </ComponentSkeleton>
);

export default ScrappedAsset;
