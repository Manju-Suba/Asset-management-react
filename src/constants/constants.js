import { jwtDecode } from 'jwt-decode';
// export const API_BASE_URL = 'http://localhost:8081/api';
// export const API_AUTH_URL = 'http://localhost:8081/api';
export const API_BASE_URL = 'https://api.cavinkare.in/asset_management_java';
export const API_AUTH_URL = 'https://api.cavinkare.in/api';
// export const API_BASE_URL = 'https://qa.cavinkare.in/assetqa';
// export const API_AUTH_URL = 'https://qa.cavinkare.in/assetqa';
// export const API_BASE_URL = 'http://ckassets.cavinkare.in/';
// export const API_AUTH_URL = 'https://ckassets.cavinkare.in/api';

// Testing demo
// export const QR_PORT = 'asset_management_react';

// QA
export const QR_PORT = 'asset_management';

const token = localStorage.getItem('token') || '';
let decoded;
if (token === '') {
	decoded = '';
} else {
	decoded = jwtDecode(token);
}
export const DECODE_USER = decoded || '';
export const ROLE = decoded?.role?.[0]?.authority || '';
export const USER = decoded?.username || '';
export const USER_MAIL = decoded?.email || '';
export const USER_PLANT = decoded?.plant || '';
export const USER_DOMAIN = decoded?.domian || '';
export const REFRESH_TOKEN = decoded?.refreshToken || '';
export const COMPANY_ID = decoded?.companyId || '';
export const USER_DATA = decoded || '';
export const ACCESS_TOKEN = token || '';

export const PERMISSIONS = {
	CAN_VIEW_DASHBOARD: 'view_dashboard',
	CAN_VIEW_ASSET_LIST: 'view_asset_list',
	CAN_VIEW_ASSET_ALLOCATION: 'view_asset_allocation',
	CAN_VIEW_ASSET_TRANSFER: 'view_asset_transfer',
	CAN_VIEW_MASTER: 'view_master',
	CAN_VIEW_ASSET_AUDIT: 'view_asset_audit',
	CAN_VIEW_DISPOSED_AUDIT: 'view_disposed_audit',
	CAN_VIEW_REPORT: 'view_report',
	CAN_VIEW_AUDIT_DISPOSED: 'view_audit_disposed',
	CAN_VIEW_SAP_ACTION_DATA: 'view_sap_action_data',
	CAN_VIEW_USER_ASSET_LIST: 'view_user_asset_list',
	CAN_VIEW_USER_SCRAP_ASSET: 'view_user_scrap_asset',
	CAN_VIEW_USER_DISPOSED_ASSET: 'view_user_disposed_asset',
	CAN_VIEW_USER1_ASSET_LIST: 'view_user1_asset_list',
	CAN_VIEW_USER1_SCRAP_ASSET: 'view_user1_scrap_asset',
	CAN_VIEW_USER1_DISPOSED_ASSET: 'view_user1_disposed_asset',
	CAN_VIEW_PROFILE: 'view_profile'
};

export const ROLE_LIST = {
	ADMIN: 'Admin',
	AUDITOR: 'Auditor',
	MAINTENANCE: 'Maintenance',
	SAP: 'Sap',
	USER: 'User',
	USER1: 'User 1'
};
export const STATUS_ASSET = {
	SCRAPPED: 'Scrapped',
	ONLINE: 'Online',
	OFFLINE: 'Offline'
};
