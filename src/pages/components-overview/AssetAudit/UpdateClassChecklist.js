import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Form, Button as Btn } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCheckListAssetClass } from 'components/redux/master/AssetClass/action';
import { updateCheckList } from 'components/redux/master/CheckList/action';
import { fetchCheckList } from 'components/redux/master/CheckList/action';
import { Grid } from '../../../../node_modules/@mui/material/index';
import CustomSelect from '../CustomSelect';
import { TagsInput } from 'react-tag-input-component';

const UpdateClassChecklist = ({ selectedAsset, editAble }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const updatedAsset = useRef(selectedAsset);
  const [EnableEdit, setEnableEdit] = React.useState();
  const [loadings, setLoadings] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedAsset.checkList);

  const CheckListAssetClass = useSelector((state) => state.AssetClassData && state.AssetClassData.CheckListAssetClass);
  // calculation


  useEffect(() => {
    form.setFieldsValue({
      assetClass: updatedAsset.current?.assetClass,
      plant: updatedAsset.current?.checkList
    });
    updatedAsset.current = form.getFieldsValue();
  }, [updatedAsset, form]);

  const onFinish = () => {
    setLoadings(true);
    form
      .validateFields()
      .then(() => {
        const data = {
          id: selectedAsset.id,
          // "assetClass" : values.assetClass,
          checkList: selected
        };
        dispatch(updateCheckList(data))
          .then((response) => {
            form.resetFields();
            // setSelected([]);
            // form.setFieldsValue({ assetClass: 'Asset Class' });
            dispatch(fetchCheckList(0,10,false,''));
            toast.success(response.data.message);
            setLoadings(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setLoadings(false);
          });
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
        setLoadings(false);
      });
  };

  const SetEditOpen = () => {
    setEnableEdit(false);
  };

  React.useEffect(() => {
    if (editAble === 'Edit') {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
    dispatch(getAllCheckListAssetClass());
  }, [dispatch, editAble]);

  return (
    <>
      <Box>
        <Form onFinish={onFinish} form={form} initialValues={form.getFieldsValue()}>
          <Grid item sx={{ ml: 3.6, mr: 3.6 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item container>
                <h3>Class Checklist</h3>
              </Grid>
            </Grid>
            {/* 1st row */}
            <Grid item container spacing={2}>
              <Grid item xs={16} sm={16} md={16} lg={16}>
                {' '}
                <Form.Item
                  label={<span className="label-style">Asset class</span>}
                  name="assetClass"
                  labelAlign="top"
                  labelCol={{ span: 24 }}
                  sx={{ height: '40px' }}
                >
                  <CustomSelect
                    defaultValue={'Asset Class'} // Set an empty default value
                    style={{ width: '100%', height: '33px' }}
                    // mode="multiple"
                    // allowClear
                    Isdisable={true}
                    showSearch
                    options={[
                      { value: '', label: 'Asset Class' }, // Empty option
                      ...CheckListAssetClass.map((option) => ({ value: option.assetClass, label: option.assetClass }))
                    ]}
                  />
                </Form.Item>
              </Grid>
              <Grid item xs={16} sm={16} md={16} lg={16} classNames="mtb-10 class-checklist">
                {' '}
                <span className="label-style mb-10">Class Checklist</span>
                <TagsInput value={selected} onChange={setSelected} name="classChecklist" placeHolder="enter class checklist" disabled={!EnableEdit} />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mt-10"
              style={{ textAlign: 'right', display: EnableEdit === true ? 'block' : 'none' }}
            >
              {' '}
              <Btn htmlType="button" className="mr-3" onClick={SetEditOpen}>
                Cancel
              </Btn>
              <Btn htmlType="submit" type="primary" loading={loadings}>
                Submit
              </Btn>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
};
export default UpdateClassChecklist;
