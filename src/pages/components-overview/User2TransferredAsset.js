// material-ui

import ComponentSkeleton from './ComponentSkeleton';

import { Card } from '../../../node_modules/@mui/material/index';
import UserTransferedAssetHeader from './User2/UserTransferedAssetHeader';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const User2TransferredAsset = () => (
  <ComponentSkeleton>
    <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
      <UserTransferedAssetHeader />
    </Card>
  </ComponentSkeleton>
);

export default User2TransferredAsset;
