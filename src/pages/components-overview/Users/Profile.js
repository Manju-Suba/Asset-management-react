import { Card } from '../../../../node_modules/@mui/material/index';
import ComponentSkeleton from '../ComponentSkeleton';
import UpdateProfile from './UpdateProfile';

const Profile = () => (
  <ComponentSkeleton>
    <Card sx={{ mt: 4 }}>
      <UpdateProfile />
    </Card>
  </ComponentSkeleton>
);

export default Profile;
