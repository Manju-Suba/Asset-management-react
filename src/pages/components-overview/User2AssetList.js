import { Card } from '../../../node_modules/@mui/material/index';
import ComponentSkeleton from './ComponentSkeleton';
import UserAssetListint from './User2/UserAssetListint';

const User2AssetList = () => {
  return (
    <ComponentSkeleton>
      <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
        <UserAssetListint />
      </Card>
    </ComponentSkeleton>
  );
};

export default User2AssetList;
