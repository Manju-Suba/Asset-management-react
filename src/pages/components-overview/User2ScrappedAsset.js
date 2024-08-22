// material-ui

import ComponentSkeleton from './ComponentSkeleton';

import { Card } from '../../../node_modules/@mui/material/index';
import UserScrappedAssetHeader from './User2/UserScrappedAssetHeader';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const User2ScrappedAsset = () => (
  <ComponentSkeleton>
    <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
      <UserScrappedAssetHeader />
    </Card>
  </ComponentSkeleton>
);

export default User2ScrappedAsset;
