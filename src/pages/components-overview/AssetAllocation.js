// material-ui

import ComponentSkeleton from './ComponentSkeleton';

import { Card } from '../../../node_modules/@mui/material/index';
import Assetfirstheader from './Assets/Assetfirstheader';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const AssetAllocation = () => (
    <ComponentSkeleton>
        <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
            <Assetfirstheader />
        </Card>
    </ComponentSkeleton>
);

export default AssetAllocation;
