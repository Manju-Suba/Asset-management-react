import React from 'react';
import Box from '@mui/material/Box';
import { Form, Button as Btn } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { assetEdit, getStockAndScrap } from 'components/redux/asset/action';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssetClass, getAllCheckListAssetClass } from 'components/redux/master/AssetClass/action';
import { saveCheckList } from 'components/redux/master/CheckList/action';
import { Grid } from '../../../../node_modules/@mui/material/index';
import CustomSelect from '../CustomSelect';
import { TagsInput } from 'react-tag-input-component';
import { fetchCheckList } from 'components/redux/master/CheckList/action';

const AddClassChecklist = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);
  const [loadings, setLoadings] = React.useState(false);
  const [assetClassError, setAssetClassError] = React.useState('');
  const [checkListError, setCheckListError] = React.useState('');
  // const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
  const CheckListAssetClass = useSelector((state) => state.AssetClassData && state.AssetClassData.CheckListAssetClass);

  let hasErrors = false;

  const onFinish = () => {
    setLoadings(true);
    setAssetClassError('');
    setCheckListError('');
    form
      .validateFields()
      .then((values) => {
        validateForm(values);
        const data = {
          assetClass: values.assetClass,
          checkList: selected
        };

        if (!hasErrors) {
          dispatch(saveCheckList(data))
            .then((response) => {
              form.resetFields();
              dispatch(fetchCheckList(0,10,false,''));
              setSelected([]);
              form.setFieldsValue({ assetClass: 'Asset Class' });
              setAssetClassError('');
              setCheckListError('');
              toast.success(response.data.message);
              setLoadings(false);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
              setLoadings(false);
            });
        }
      })
      .catch((errorInfo) => {
        console.log('Error :', errorInfo);
      });
  };

  const validateForm = (value) => {
    if (selected.length === 0) {
      setCheckListError('Check List is required');
      hasErrors = true;
      setLoadings(false);
    } else {
      setCheckListError('');
    }

    if (!value.assetClass || value.assetClass === 'Asset Class') {
      setAssetClassError('Asset class is required');
      hasErrors = true;
      setLoadings(false);
    } else {
      setAssetClassError('');
    }

    if (selected.length > 0 && value.assetClass && value.assetClass !== 'Asset Class') {
      hasErrors = false;
    }
  };

  React.useEffect(() => {
    dispatch(getAllAssetClass());
    dispatch(getAllCheckListAssetClass());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Form onFinish={onFinish} form={form} initialValues={form.getFieldsValue()}>
          <Grid item sx={{ ml: 3.6, mr: 3.6 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item container>
                <h3>New Checklist Creation</h3>
              </Grid>
            </Grid>
            {/* 1st row */}
            <Grid item container spacing={2}>
              <Grid item xs={16} sm={16} md={16} lg={16}>
                {' '}
                <Form.Item
                  className="formAssetClass"
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
                    showSearch
                    options={[
                      { value: '', label: 'Asset Class' },
                      ...CheckListAssetClass.map((option) => ({ value: option.assetClass, label: option.assetClass }))
                    ]}
                  />
                </Form.Item>
                <span style={{ color: '#ff4d4f', fontSize: '12px', fontFamily: 'Open Sans' }}>{assetClassError}</span>
              </Grid>
              <Grid item xs={16} sm={16} md={16} lg={16} className="mtb-10 class-checklist">
                {' '}
                <span className="label-style mb-10">Class Checklist</span>
                <TagsInput value={selected} onChange={setSelected} name="classChecklist" placeHolder="enter class checklist" />
                <span style={{ color: '#ff4d4f', fontSize: '12px', fontFamily: 'Open Sans' }}>{checkListError}</span>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'right' }}>
              {' '}
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
export default AddClassChecklist;
