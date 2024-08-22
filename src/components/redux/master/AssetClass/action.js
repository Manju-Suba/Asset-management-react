import axiosInstance from '../../../../constants/Global';
import { GET_ASSET_CLASS, GET_ASSET_CLASS_MASTER,GET_CHECK_LIST_ASSET_CLASS } from 'components/redux/actionType';

export const getAllAssetClass = (assetsignal) => {
  return (dispatch) => {
    let url = `/asset-class/get-all`;

    axiosInstance
      .get(url, {
        signal: assetsignal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_CLASS,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAllCheckListAssetClass = () =>{

  return (dispatch) => {

    const url = `/asset-class/check-list-asset-class`;
    axiosInstance
        .get(url,{
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          dispatch({
            type: GET_CHECK_LIST_ASSET_CLASS,
            payload: res.data.data
          });
        }).catch((error) => {
          console.log('error', error);
        });
  }
}

export const getAllAssetClassMaster = (page, pageSize) => {
  return (dispatch) => {
    let pageNo;
    let url;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }

    url = `/asset-class/get-all-master?page=${pageNo}&size=${pageSize}`;

    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_CLASS_MASTER,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};
