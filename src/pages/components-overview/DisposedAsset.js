import { Card } from '../../../node_modules/@mui/material/index';
import ComponentSkeleton from './ComponentSkeleton';
import DisposedHeader from './Disposed/DisposedHeader';

const DisposedAsset = () => {
    return (
        <ComponentSkeleton>
            <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
                <DisposedHeader />
            </Card>
        </ComponentSkeleton>
    );
};

export default DisposedAsset;
