import {
	GET_ASSET_COUNT,
	GET_ASSET_CATEGORY_COUNT,
	GET_ASSET_DAMAGED_REJECTED,
	GET_ASSET_DAMAGED_RATE,
	GET_RECENT_PURCHASE_ASSET,
	GET_OVERALL_ASSET_STATUS,
	GET_STATUS_ASSET_COUNT,
	GET_MAJOR_MINOR_ASSET,
	GET_DAMAGED_REJECTED
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const getAssetCount = (page, size) => {
	return (dispatch) => {
		let url = `/dashboard/asset-type-count`;

		url += page ? `?page=${page}` : `?page=0`;
		url += size ? `&size=${size}` : `&size=6`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_COUNT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetCategoryCount = () => {
	return (dispatch) => {
		let url = `/dashboard/asset-category-count`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_CATEGORY_COUNT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetDamagedRate = (year) => {
	return (dispatch) => {
		let url = `/dashboard/damaged-assets-rate`;
		if (year) {
			url += `?year=${year}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_DAMAGED_RATE,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetDamagedRejectd = () => {
	return (dispatch) => {
		let url = `/dashboard/damaged-and-rejected`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_DAMAGED_REJECTED,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetpurchased = () => {
	return (dispatch) => {
		let url = `/dashboard/recently-purchased`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_RECENT_PURCHASE_ASSET,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getOverAllAssetStatus = () => {
	return (dispatch) => {
		let url = `/dashboard/overall-stocks-and-dispose`;
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_OVERALL_ASSET_STATUS,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getStatusAssetCount = (page, size) => {
	return (dispatch) => {
		let url = `/dashboard/assets-count`;
		url += page ? `?page=${page}` : `?page=0`;
		url += size ? `&size=${size}` : `&size=6`;
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_STATUS_ASSET_COUNT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getMajorMinorAssetClass = (page, size) => {
	return (dispatch) => {
		let url = `/dashboard/major-minor`;
		url += page ? `?page=${page}` : `?page=0`;
		url += size ? `&size=${size}` : `&size=6`;
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_MAJOR_MINOR_ASSET,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getDamageReject = (page, size) => {
	return (dispatch) => {
		let url = `/dashboard/rejected-assets`;
		url += page ? `?page=${page}` : `?page=0`;
		url += size ? `&size=${size}` : `&size=6`;
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_DAMAGED_REJECTED,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};