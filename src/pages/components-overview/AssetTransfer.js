import { Card } from '../../../node_modules/@mui/material/index';
import TransferHeader from './AssetTransfer/TransferHeader';
import ComponentSkeleton from './ComponentSkeleton';

const AssetTransfer = () => {
    return (
        <ComponentSkeleton>
            <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
                <TransferHeader />
            </Card>
        </ComponentSkeleton>
    );
};

export default AssetTransfer;
