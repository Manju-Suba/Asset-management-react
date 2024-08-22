import { Card } from '../../../node_modules/@mui/material/index';
import ComponentSkeleton from './ComponentSkeleton';
import Softwareheader from './Master/Software/Softwareheader';

const Software = () => {
    return (
        <ComponentSkeleton>
            <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
                <Softwareheader />
            </Card>
        </ComponentSkeleton>
    );
};

export default Software;
