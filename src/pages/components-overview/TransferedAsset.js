// material-ui

import ComponentSkeleton from './ComponentSkeleton';

import { Card } from '../../../node_modules/@mui/material/index';
import TransferedAssetHeader from './UserAssets/TransferedAssetHeader';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const TransferedAsset = () => (
  <ComponentSkeleton>
    <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
      <TransferedAssetHeader />
    </Card>
  </ComponentSkeleton>
);

export default TransferedAsset;
