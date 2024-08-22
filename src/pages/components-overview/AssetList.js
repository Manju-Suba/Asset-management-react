import { Card } from '../../../node_modules/@mui/material/index';
import AllassetTable from './Assetlist/AllassetTable';
// import Assetlistheader from './Assetlist/Assetlistheader';
import ComponentSkeleton from './ComponentSkeleton';

const AssetList = () => {
    return (
        <ComponentSkeleton>
            <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
                <AllassetTable />
            </Card>
        </ComponentSkeleton>
    );
};

export default AssetList;
