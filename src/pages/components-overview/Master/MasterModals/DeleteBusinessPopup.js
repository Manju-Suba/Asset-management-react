import React from 'react';
import { Modal } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBusiness, getAllBusinessDetails } from 'components/redux/master/Business/action';

const DeleteBusiness = (props) => {
    const { open, onClose, selectedRowId } = props;

    const dispatch = useDispatch();

    const handleCancel = () => {
        onClose();
    };

    const handleDeleteBusiness = () => {
        dispatch(deleteBusiness(selectedRowId))
            .then((res) => {
                toast.success(res.data.message);
                dispatch(getAllBusinessDetails());
                onClose();
            })
            .catch((error) => {
                return error;
            });
    };

    return (
        <>
            <Modal
                title="Delete Business"
                visible={open}
                onCancel={handleCancel}
                width={600}
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
                okText="Delete"
                onOk={handleDeleteBusiness}
            >
                <Divider />
                <div>
                    <h4>Are You sure want to delete this Business!</h4>
                </div>
            </Modal>
        </>
    );
};

export default DeleteBusiness;
