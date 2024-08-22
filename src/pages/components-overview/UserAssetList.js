import { Card } from '../../../node_modules/@mui/material/index';
import ComponentSkeleton from './ComponentSkeleton';
import AssetListint from './UserAssets/AssetListint';

const UserAssetList = () => {
  return (
    <ComponentSkeleton>
      <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
        <AssetListint />
      </Card>
    </ComponentSkeleton>
  );
};

export default UserAssetList;
