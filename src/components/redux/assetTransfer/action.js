import {
	GET_ASSET_TRANSFER,
	GET_ASSET_TRANSFER_BY_STATUS,
	GET_ASSET_TRANSFER_BY_ID,
	GET_TRANSFER_HISTORY_BY_ASSETID,
	GET_ASSET_TRANSFER_STATUS_APPROVE,
	GET_ASSET_TRANSFER_STATUS_REJECT
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const assetTransferCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/multiUsers/transfer-request`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const getAllAssetTransfer = () => {
	return (dispatch) => {
		let url = `/transfer/get-all`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TRANSFER,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetTransferByStatus = (status, assetclass, assetType, assetId, page, pageSize) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}
		// let pageSize = 2;
		let url = `/multiUsers/transferred-by-status?page=${pageNo}&size=${pageSize}&status=${status}`;
		if (assetclass && assetclass != 'Choose Asset Class') {
			url += `&assetClass=${assetclass}`;
		}
		if (assetType && assetType != 'Asset Status' && assetType != '') {
			url += `&assetType=${assetType}`;
		}

		if (assetId) {
			url += `&assetId=${assetId}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				if (status == 'Approved') {
					dispatch({
						type: GET_ASSET_TRANSFER_STATUS_APPROVE,
						payload: res.data.data
					});
				} else if (status == 'Rejected') {
					dispatch({
						type: GET_ASSET_TRANSFER_STATUS_REJECT,
						payload: res.data.data
					});
				} else {
					dispatch({
						type: GET_ASSET_TRANSFER_BY_STATUS,
						payload: res.data.data
					});
				}
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetTransferByStatus_Users = (status, assetclass, assetType, assetId, page, pageSize) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}
		// let pageSize = 2;
		let url = `/multiUsers/transferred-by-status?page=${pageNo}&size=${pageSize}&status=${status}`;
		if (assetclass && assetclass != 'Choose Asset Class') {
			url += `&assetClass=${assetclass}`;
		}
		if (assetType && assetType != 'Asset Status' && assetType != '') {
			url += `&assetType=${assetType}`;
		}

		if (assetId) {
			url += `&assetId=${assetId}`;
		}
		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				if (status == 'Approved') {
					dispatch({
						type: GET_ASSET_TRANSFER_STATUS_APPROVE,
						payload: res.data.data
					});
				} else if (status == 'Rejected') {
					dispatch({
						type: GET_ASSET_TRANSFER_STATUS_REJECT,
						payload: res.data.data
					});
				} else {
					dispatch({
						type: GET_ASSET_TRANSFER_BY_STATUS,
						payload: res.data.data
					});
				}
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetTransferById = (categoryId) => {
	return (dispatch) => {
		axiosInstance
			.get(`/transfer/get-byid?id=${categoryId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TRANSFER_BY_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getTransferByAssetId = (assetId) => {
	return (dispatch) => {
		axiosInstance
			.get(`/transfer/get-all-transfer-history-by-assetid?assetId=${assetId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_TRANSFER_HISTORY_BY_ASSETID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const assetTransferUpdate = (id, assetId, status) => {
	return async () => {
		const response = await axiosInstance.put(
			`/multiUsers/multiple-asset-status-update`,
			{
				id: `${id}`,
				assetId: `${assetId}`,
				status: `${status}`
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return response;
	};
};

export const multiAssetTransferUpdate = (assetId, status) => {
	return async () => {
		const response = await axiosInstance.put(
			`/transfer/multiple-asset-status-update?ids=${assetId}&status=${status}`,
			{},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return response;
	};
};

export const deleteAssetTransfer = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/transfer-type/delete?id=${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};
