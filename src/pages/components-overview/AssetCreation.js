import { Card } from '../../../node_modules/@mui/material/index';
import AllassetTicket from './AssetCreation/AllassetTicket';
// import Assetlistheader from './Assetlist/Assetlistheader';
import ComponentSkeleton from './ComponentSkeleton';

const AssetCreation = () => {
	return (
		<ComponentSkeleton>
			<Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
				<AllassetTicket />
			</Card>
		</ComponentSkeleton>
	);
};

export default AssetCreation;
