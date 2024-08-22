import {
	GET_ASSET_TICKET_NO,
	GET_ASSET_TICKET,
	GET_ASSET_TICKET_BY_ID,
	GET_ASSET_TICKET_NO_COUNT,
	GET_STATUSWISE_ASSET_TICKET
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const assetTicketCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/asset-ticket/create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllAssetTicketNo = (type) => {
	return (dispatch) => {
		axiosInstance
			.get(`/asset-ticket/asset-creation-filter-data?type=${type}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TICKET_NO,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAllAssetTicket = (assetClass, ticketNo, page, pageSize, search, value, signal) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}

		let url = `/asset-ticket/fetch-all-ticket?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
		if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
			url += `&assetClass=${assetClass}`;
		}
		if (ticketNo && ticketNo != 'Ticket No') {
			url += `&ticketNo=${ticketNo}`;
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
					type: GET_ASSET_TICKET,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetTicketById = (id) => {
	return (dispatch) => {
		let url = `/asset-ticket/get-by-id?id=${id}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TICKET_BY_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_ASSET_TICKET_BY_ID,
					payload: []
				});
				console.log('error', error);
			});
	};
};

export const assetTicketUpdate = (id, data) => {
	return async () => {
		const response = await axiosInstance.put(`/asset-ticket/update?id=${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteAssetTicket = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/asset-ticket/detele?id=${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const statusUpdate = (id, status) => {
	return async () => {
		const response = await axiosInstance.put(`/asset-ticket/staus-update?id=${id}&status=${status}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const getTicketNoCount = () => {
	return (dispatch) => {
		let url = `/asset-ticket/ticket-no-count`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TICKET_NO_COUNT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_ASSET_TICKET_NO_COUNT,
					payload: []
				});
				console.log('error', error);
			});
	};
};

export const getPendingAssetTicket = (assetClass, ticketNo, page, pageSize, search, value, signal, ticketType) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}

		let url = `/asset-ticket/fetch-statuswise-asset-ticket?page=${pageNo}&size=${pageSize}&ticketType=${ticketType}&search=${search}&value=${value}`;
		if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
			url += `&assetClass=${assetClass}`;
		}
		if (ticketNo && ticketNo != 'Ticket No') {
			url += `&ticketNo=${ticketNo}`;
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
					type: GET_STATUSWISE_ASSET_TICKET,
					payload: res.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

// // sapActionUpdate
// export const sapActionUpdate = (ticketNo, sapStatus) => {
// 	return async () => {
// 		const response = await axiosInstance.put(`/asset-ticket/sap-update?ticketNo=${ticketNo}`, data, {
// 			headers: {
// 				'Content-Type': 'multipart/form-data'
// 			}
// 		});
// 		return response;
// 	};
// };

export const sapActionUpdate = (ticketNo, sapStatus) => {
	return async () => {
		const formData = new FormData();
		formData.append('ticketNo', ticketNo);
		formData.append('sapStatus', sapStatus);

		const response = await axiosInstance.put('/asset-ticket/sap-update', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};
