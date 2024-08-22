// material-ui

// project import
import ComponentSkeleton from './ComponentSkeleton';
import { Card } from '../../../node_modules/@mui/material/index';
import Masterheader from './Master/Masterheader';

// styles

// ============================|| ANT ICONS ||============================ //

const Master = () => (
    <ComponentSkeleton>
        <Card sx={{ mt: 4 }}>
            <Masterheader />
        </Card>
    </ComponentSkeleton>
);

export default Master;
