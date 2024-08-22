import { ReactComponent as Disposed } from 'assets/images/icons/trash.svg';
import { ReactComponent as Report } from 'assets/images/icons/report.svg';
import { ReactComponent as AssetList } from 'assets/images/icons/list.svg';
import { ReactComponent as Master } from 'assets/images/icons/master.svg';
import { ReactComponent as Audit } from 'assets/images/icons/audit.svg';
import { ReactComponent as Allocation } from 'assets/images/icons/allocation.svg';
import { ReactComponent as AssetTransfer } from 'assets/images/icons/transfer.svg';
import { ReactComponent as Dashboard } from 'assets/images/icons/dashboard.svg';
import { ROLE_LIST } from '../constants/constants';
//import style css
import '../menu-items/style.css';

const MenuLists = () => {
	const icons = {
		Dashboard,
		AssetTransfer,
		Allocation,
		Audit,
		Master,
		AssetList,
		Report,
		Disposed
	};

	return [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.Dashboard,
			breadcrumbs: true,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-creation',
			title: 'Asset Creation',
			type: 'item',
			url: '/AssetCreation',
			icon: icons.AssetList,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-list',
			title: 'Asset List',
			type: 'item',
			url: '/AssetList',
			icon: icons.AssetList,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-allocation',
			title: 'Asset Allocation',
			type: 'item',
			url: '/AssetAllocation',
			icon: icons.Allocation,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-transfer',
			title: 'Asset Transfer',
			type: 'item',
			url: '/AssetTransfer',
			icon: icons.AssetTransfer,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-audit',
			title: 'Asset Audit',
			type: 'item',
			url: '/AssetAudit',
			icon: icons.Audit,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Disposed-asset',
			title: 'Disposed Asset',
			type: 'item',
			url: '/DisposedAsset',
			icon: icons.Disposed,
			access: ROLE_LIST.ADMIN
		},
		// {
		//   id: 'util-Report',
		//   title: 'Reports',
		//   type: 'item',
		//   url: '/Report',
		//   icon: icons.Report
		// },
		// {
		//   id: 'util-Software',
		//   title: 'Software',
		//   type: 'item',
		//   url: '/Software',
		//   icon: icons.Location
		// },
		{
			id: 'util-Master',
			title: 'Master',
			type: 'item',
			url: '/Master',
			icon: icons.Master,
			breadcrumbs: true,
			access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-audit-disposed',
			title: 'Audit',
			type: 'item',
			url: '/AssetAuditDisposed',
			icon: icons.Audit,
			breadcrumbs: true,
			access: ROLE_LIST.AUDITOR
		},
		{
			id: 'util-Asset-creation',
			title: 'Asset Creation',
			type: 'item',
			url: '/SapAssetCreation',
			icon: icons.Audit,
			breadcrumbs: true,
			access: ROLE_LIST.SAP
		},
		{
			id: 'util-user-asset-list',
			title: 'Asset List',
			type: 'item',
			url: '/asset-list',
			icon: icons.AssetList,
			access: ROLE_LIST.USER
		},
		{
			id: 'util-user-scrapped-asset-list',
			title: 'Scrapped Asset',
			type: 'item',
			url: '/scarpped-asset',
			icon: icons.Disposed,
			access: ROLE_LIST.USER
		},
		{
			id: 'util-user-transferred-asset-list',
			title: 'Transferred Asset',
			type: 'item',
			url: '/transfered-asset',
			icon: icons.AssetTransfer,
			access: ROLE_LIST.USER
		},
		{
			id: 'util-user-asset-list',
			title: 'Asset List',
			type: 'item',
			url: '/asset-list',
			icon: icons.AssetList,
			access: ROLE_LIST.USER1
		},
		{
			id: 'util-user-scrapped-asset-list',
			title: 'Scrapped Asset',
			type: 'item',
			url: '/scarpped-asset',
			icon: icons.Disposed,
			access: ROLE_LIST.USER1
		},
		{
			id: 'util-user-transferred-asset-list',
			title: 'Transferred Asset',
			type: 'item',
			url: '/transfered-asset',
			icon: icons.AssetTransfer,
			access: ROLE_LIST.USER1
		}
	];
};

const Utilities = {
	id: 'utilities',
	title: 'Utilities',
	type: 'group',
	children: MenuLists()
};

export default Utilities;
