import {
	GET_ASSET_AUDIT,
	GET_ASSET_PENDING_AUDIT,
	GET_ASSET_PENDING_REQUEST_AUDIT,
	GET_ASSET_AUDIT_PENDING,
	GET_ASSET_AUDIT_BY_STATUS,
	GET_ASSET_AUDIT_COMPLETED,
	GET_ASSET_AUDIT_BY_ID,
	GET_AUDIT_BY_ASSET_ID,
	GET_ASSET,
	GET_CHECK_LIST,
	GET_OBSERVATION_DATA,
	GET_CHECK_LIST_AUDIT,
	GET_CHILD_ID_AUDIT,
	GET_ASSET_AUDIT_BY_REJECTED
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const assetAuditDateCreate = (assetId, auditdate) => {
	return async () => {
		if (!assetId) {
			throw new Error('Invalid Data');
		}
		if (!auditdate) {
			throw new Error('Invalid Audit Date');
		}
		try {
			const response = await axiosInstance.post(
				`/audit/save-audit-date?assetId=${assetId}&auditDate=${auditdate}`,
				{},
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);
			return response;
		} catch (error) {
			console.error('Error while saving audit date:', error);
			throw error; // Rethrow the error for the caller to handle
		}
	};
};

export const assetAuditActionCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/audit/action-create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllAssetAudit = () => {
	return (dispatch) => {
		let url = `/audit/get-all`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getPendingAssetAudit = (page, pageSize, search, value, assetClass, assetTypeid) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}
		let url = `/audit/pending-audit-asset?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
		if (assetClass != 'Choose Asset Class' && assetClass != undefined) {
			url += `&assetClass=${assetClass}`;
		}
		if (assetTypeid) {
			url += `&assetTypeId=${assetTypeid}`;
		}

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_PENDING_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetAuditPending = (page, pageSize, categoryId, assetTypeid, search, value, signal) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}
		let url = `/audit/audit-fetch-pending?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
		if (categoryId != 'Choose Asset Category' && categoryId != undefined && categoryId != 'Choose Asset Class') {
			url += `&assetClass=${categoryId}`;
		}

		if (assetTypeid) {
			url += `&assetTypeId=${assetTypeid}`;
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
					type: GET_ASSET_AUDIT_PENDING,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getRequestAssetAuditPending = (page, pageSize, search, value, assetClass) => {
	return (dispatch) => {
		let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/audit/request-audit-asset?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
    if (assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `&assetClass=${assetClass}`;
    }
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_PENDING_REQUEST_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetAuditByStatus = (page, pageSize, search, value, status, category, signal) => {
	return (dispatch) => {
		let pageNo = page ? page : 0;
		let url = `/audit/asset-audit-by-status?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}&status=${status}`;
		if (category && category !== 'Choose Asset Category' && category !== undefined) {
			url += `&assetClass=${category}`;
		}
		let type;
		if (status == 'Approved') {
			type = GET_ASSET_AUDIT_BY_STATUS;
		} else {
			type = GET_ASSET_AUDIT_BY_REJECTED;
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

export const getAssetAuditCompleted = (page, pageSize, search, value, assetClass) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}
		let url = `/audit/completed-assets?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
		if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
			url += `&assetClass=${assetClass}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_AUDIT_COMPLETED,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetAuditById = (auditId) => {
	return (dispatch) => {
		axiosInstance
			.get(`/audit/audit-fetch-byid?id=${auditId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_AUDIT_BY_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAuditByAssetId = (auditId) => {
	return (dispatch) => {
		axiosInstance
			.get(`/audit/get-all-audit-data-by-assetid?assetId=${auditId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_AUDIT_BY_ASSET_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const assetAuditUpdate = (data) => {
	return async () => {
		const response = await axiosInstance.put(`/audit/update-status`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteAssetTransfer = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/audit-type/delete?id=${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const getAssetById = (id, companyId, plant) => {
	return (dispatch) => {
		let url = `/asset/get-by-id?id=${id}&company=${companyId}&plant=${plant}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getCheckListByAssetClass = (assetClass) => {
	return (dispatch) => {
		let url = `/check-list/get-by-AssetClass?assetClass=${assetClass}`;

		axiosInstance
			.get(url, {
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

export const getObservation = (page, pageSize, search, value, category, signal) => {
	return (dispatch) => {
		let pageNo = page ? page : 0;
		let url = `/observation/getList?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
		if (category && category !== 'Choose Asset Category' && category !== undefined) {
			url += `&assetClass=${category}`;
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
					type: GET_OBSERVATION_DATA,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
export const observationActionCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/observation/create`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};
export const getCheckListToAudit = (assetClass, plant, companyId) => {
	return (dispatch) => {
		let url = `/auth/get-by-AssetClass?assetClass=${assetClass}&plant=${plant}&companyId=${companyId}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_CHECK_LIST_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
export const getChildIdToAudit = (assetId, plant, companyId) => {
	return (dispatch) => {
		let url = `/auth/get-childId-by-AssetId?assetId=${assetId}&plant=${plant}&companyId=${companyId}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_CHILD_ID_AUDIT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};
