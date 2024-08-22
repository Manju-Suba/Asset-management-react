import {
	GET_ASSET_NO,
	GET_ASSET_STOCK_SCRAP,
	GET_ASSET_STOCK,
	GET_ASSET_RETRAIL,
	GET_ASSET_DETAILS,
	GET_ASSET_BY_ID,
	GET_CHECK_LIST,
	GET_ASSET_DETAILS_AUDIT,
	GET_ASSET_NOT_REPLACED,
	GET_ASSET_SCRAP_STOCK,
	GET_ASSET_MAINTENANCE
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const assetCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/asset/create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllAssetNoDetails = () => {
	return (dispatch) => {
		axiosInstance
			.get(`/asset/get-all`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_NO,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getStockAndScrap = (status, assetClass, SubClass, assetStatus, page, pageSize, search, value, signal) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}

		let url = `/asset/get-all-assets?page=${pageNo}&size=${pageSize}&availableStatus=${status}&search=${search}&value=${value}`;

		if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
			url += `&assetClass=${assetClass}`;
		}
		if (SubClass && SubClass != 'Choose SubClass') {
			url += `&subClass=${SubClass}`;
		}
		if (assetStatus) {
			url += `&assetStatus=${assetStatus}`;
		}
		let type;
		if (status == 'Stock') {
			type = GET_ASSET_STOCK_SCRAP;
		} else {
			type = GET_ASSET_SCRAP_STOCK;
		}
		axiosInstance
			.get(url, {
				signal: signal,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: type,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAllAssetDetails = (category, assetType) => {
	return (dispatch) => {
		let url = `/asset/get-asset-allocation?availableStatus=Allocate&allocateType=No`;
		if (category && category != 'Choose Asset Category' && category != undefined) {
			url += `&assetCategoryId=${category}`;
		}
		if (assetType) {
			url += `&assetTypeId=${assetType}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_ALLOCATED,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetByAssetId = (assetId) => {
	return (dispatch) => {
		let url = `/asset/get-by-assetId?assetId=${assetId}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_BY_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_ASSET_BY_ID,
					payload: []
				});
				console.log('error', error);
			});
	};
};

export const getAssetListByAssetId = (assetId) => {
	return async () => {
		let url = `/asset/get-by-assetId?assetId=${assetId}`;

		const response = await axiosInstance.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const getAllAssetStockDetails = (category, assetType) => {
	return (dispatch) => {
		let url = `/asset/get-asset-allocation?availableStatus=Stock&allocateType=temporary`;
		if (category && category != 'Choose Asset Category' && category != undefined) {
			url += `&assetCategoryId=${category}`;
		}
		if (assetType) {
			url += `&assetTypeId=${assetType}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_STOCK,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAllAssetRetrialDetails = (category, assetType) => {
	return (dispatch) => {
		let url = `/asset/get-asset-allocation?availableStatus=Retrial&allocateType=temporary`;
		if (category && category != 'Choose Asset Category' && category != undefined) {
			url += `&assetCategoryId=${category}`;
		}
		if (assetType) {
			url += `&assetTypeId=${assetType}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_RETRAIL,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetByCategory = (categoryId) => {
	return (dispatch) => {
		axiosInstance
			.get(`/asset/get-type-by-category?categoryId=${categoryId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_BY_CATEGORY,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const assetUpdate = (data) => {
	return async () => {
		const response = await axiosInstance.put(`/asset/update`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteAsset = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/asset-type/delete?id=${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const assetEdit = (data) => {
	return async () => {
		const response = await axiosInstance.put(`/asset/update`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAssetDetails = (id, company, plant) => {
	return async (dispatch) => {
		await axiosInstance
			.get(`/asset/get-by-id?id=${id}&company=${company}&plant=${plant}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_DETAILS,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getCheckList = (assetClass, company, plant) => {
	return async (dispatch) => {
		await axiosInstance
			.get(`/check-list/get-by-class?assetClass=${assetClass}&company=${company}&plant=${plant}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_CHECK_LIST,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
export const getAssetDetailsForAudit = (id, company, plant, assetClass) => {
	return async (dispatch) => {
		await axiosInstance
			.get(`/asset/get-by-assetId-audit?assetId=${id}&company=${company}&plant=${plant}&assetClass=${assetClass}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_DETAILS_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getNotReplacedAsset = () => {
	return (dispatch) => {
		axiosInstance
			.get(`/asset/fetch-not-replaced`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_NOT_REPLACED,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
export const getMaintenanceList = (assetId, fromDate, toDate, paagereduce, Size, signal) => {
	return (dispatch) => {
		let pageNo;
		if (paagereduce) {
			pageNo = paagereduce;
		} else {
			pageNo = 0;
		}
		let url = `/maintenance/fetch-by-assetId?assetId=${assetId}&page=${pageNo}&size=${Size}`;
		if (fromDate && fromDate != null && fromDate != undefined && toDate && toDate != null && toDate != undefined) {
			url += `&fromDate=${fromDate}&toDate=${toDate}`;
		}
		axiosInstance
			.get(url, {
				signal: signal,
				headers: {
					'Content-Type': 'application/json'
					
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_MAINTENANCE,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
