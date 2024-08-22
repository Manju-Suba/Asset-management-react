import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { TextField } from '@mui/material';
import { Grid } from '../../../../node_modules/@mui/material/index';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import BulkUpload from './AssetModals/BulkUploadPopup';
import Addassets from './AssetModals/CreateAssetPopup';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAssetTypeByCategory } from 'components/redux/master/AssetType/action';
import { getAllAssetStockDetails } from 'components/redux/asset/action';

function Assetheader() {
    const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Category');
    // eslint-disable-next-line no-unused-vars
    const [selectedAssetType, setSelectedAssetType] = React.useState(null);
    const dispatch = useDispatch();
    // const AssetAllocated = useSelector((state) => state.AssetData && state.AssetData.AssetAllocated);
    const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
    const AssetTypeDetails = useSelector((state) => state.AssetTypeData && state.AssetTypeData.AssetTypeByCate);

    const All = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'Yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true }
    ];

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        dispatch(getAssetTypeByCategory(value));
        dispatch(getAllAssetStockDetails());
        // setAssetTypes(AssetTypeDetails || []);
    };

    const handleAssetTypeChange = (value) => {
        setSelectedAssetType(value);
        dispatch(getAssetTypeByCategory(value));

        // setAssetTypes(AssetTypeDetails || []);
    };
    React.useEffect(() => {
        dispatch(getAllAssetCategoryDetails());
    }, [dispatch]);

    return (
        <Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
            <Toolbar disableGutters sx={{ height: '50%' }}>
                <Grid item container spacing={2} columns={16}>
                    {/* 1st col */}
                    <Grid item lg={2} sm={4}>
                        {/* search box */}
                        <TextField
                            name="asset"
                            type={'text'}
                            placeholder="search "
                            sx={{ border: 'none' }}
                            InputProps={{
                                style: { width: '100%', height: '33px', color: '#C7C7C7', bgcolor: '#FBFBFB' },
                                startAdornment: (
                                    <IconButton aria-label="Toggle password visibility" edge="start">
                                        <SearchSharpIcon sx={{ color: '#C7C7C7', fontSize: '18px', fontWeight: '700' }} />
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>

                    {/* 2nd col */}
                    <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                        <Select
                            defaultValue="Asset Category"
                            style={{ width: '100%', height: '33px' }}
                            showSearch
                            onChange={handleCategoryChange}
                            options={AssetCategoryDetails.map((option) => ({
                                value: option.id,
                                label: option.assetClass
                            }))}
                        />
                    </Grid>
                    {/* 3nd  col*/}
                    <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                        <Select
                            defaultValue="Asset type"
                            style={{ width: '100%', height: '33px' }}
                            showSearch
                            onChange={handleAssetTypeChange}
                            disabled={selectedCategory == 'Choose Asset Category'}
                            options={AssetTypeDetails.map((option) => ({
                                value: option.id,
                                label: option.name
                            }))}
                        />
                    </Grid>
                    {/* 4th col */}
                    <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                        <Select
                            defaultValue="All"
                            style={{ width: '100%', height: '33px' }}
                            showSearch
                            options={All.map((option) => ({
                                value: option.value,
                                label: option.label,
                                disabled: option.disabled
                            }))}
                        />
                    </Grid>
                    {/* 5th col */}

                    <Grid item lg={6} sm={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Grid item>
                                <BulkUpload />
                            </Grid>
                            <Grid item>
                                <Addassets />
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </Container>
    );
}
export default Assetheader;
