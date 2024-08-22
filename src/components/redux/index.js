// master - business
import { combineReducers } from 'redux';
import menu from '../../store/reducers/menu';
import getAllBusinessList from './master/Business/reducer';
import getEditBusinessList from './master/Business/reducer';
import AssetCategoryData from './master/AssetCatogory/reducer';
import AssetTypeData from './master/AssetType/reducer';
import BrandList from './master/Brand/reducer';
import LocationList from './master/Location/reducer';
import DepartmentList from './master/Department/reducer';
import EmployeeList from './master/Employee/reducer';
import AssetData from './asset/reducer';
import AllSoftware from './software/reducer';
import AllAssetList from './Assetlist/reducer';
import AssetTransfer from './assetTransfer/reducer';
import AssetActivityList from './AssetReport/reducer';
import AssetCount from './dashboard/reducer';
import AssetAudit from './AssetAudit/reducer';
import DisposalAsset from './DisposalAsset/reducer';
import AssetClass from './master/AssetClass/reducer';
import AssetSubClass from './master/AssetSubClass/reducer';
import CheckList from './master/CheckList/reducer';
import UserDetails from './User/reducer';
import AssetCreation from './AssetCreation/reducer';

const reducers = combineReducers({
	menu,
	BusinessAllData: getAllBusinessList,
	EditBusinessData: getEditBusinessList,
	AssetCateData: AssetCategoryData,
	AssetTypeData: AssetTypeData,
	BrandData: BrandList,
	LocationData: LocationList,
	DepartmentData: DepartmentList,
	EmployeeData: EmployeeList,
	AssetData: AssetData,
	SoftwareData: AllSoftware,
	AssetListData: AllAssetList,
	AssetTransferData: AssetTransfer,
	AssetReportData: AssetActivityList,
	DashboardData: AssetCount,
	AssetAuditData: AssetAudit,
	DisposalAssetData: DisposalAsset,
	AssetClassData: AssetClass,
	UserProfileData: UserDetails,
	AssetSubClassData:AssetSubClass,
	CheckListData:CheckList,
	AssetCreationData:AssetCreation
});

export default reducers;
