import { Card } from '../../../node_modules/@mui/material/index';
import SapAssetCreationHeader from './SapAssetCreation/AssetCreationHeader';
// import Assetlistheader from './Assetlist/Assetlistheader';
import ComponentSkeleton from './ComponentSkeleton';

const SapAssetCreation = () => {
	return (
		<ComponentSkeleton>
			<Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
                <SapAssetCreationHeader />
			</Card>
		</ComponentSkeleton>
	);
};

export default SapAssetCreation;
