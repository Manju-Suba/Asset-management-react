import React from 'react';
import Box from '@mui/material/Box';
import { Chip, Grid } from '../../../../node_modules/@mui/material/index';
import { Form, Timeline, Col, Row, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTransferByAssetId } from 'components/redux/assetTransfer/action';
import dayjs from 'dayjs';
import { ReactComponent as Location } from 'assets/images/icons/location.svg';
import { ReactComponent as Vector } from 'assets/images/icons/vector.svg';


const styles = `
    b {
        font-weight: 800;
        font-size: 11px;
    }

    .small-x{
        font-size: 10px;
    }
`;

const TransferList = ({ selectedAsset }) => {
    const dispatch = useDispatch();
    const TransferAsset = useSelector((state) => state.AssetTransferData && state.AssetTransferData.TransferHistoryByAssetId);

    React.useEffect(() => {
        if (selectedAsset) {
            dispatch(getTransferByAssetId(selectedAsset.assetId));
        }
    }, [dispatch, selectedAsset]);

    
    const baselocationStyle = {
        width: '30px',
        height: 42
    };

    return (
        <>
            <style>{styles}</style>
            <Box className="margin-top-30px">
                <Form>
                    <Grid item sx={{ ml: 3.6, mr: 3.6 }}>
                        <Grid>
                            <Timeline>
                                {TransferAsset
                                    ? TransferAsset.map((option, index) => (
                                        <Timeline.Item key={option.id}>
                                            <small className="text-grey-label" >Transfer {index + 1} | {dayjs(option.auditDate).format('DD MMM, YYYY')}</small>
                                            <Row>
                                                <Col span={5} xs={{ span: 6 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 6 }} >

                                                    <div className="box-timeline-list">
                                                        <small className="text-grey-label small-x">Transferred From</small>
                                                        <Row>
                                                            <Col span={12}  >
                                                                <Flex gap="small">
                                                                    <Flex>
                                                                        <div style={{...baselocationStyle }} >
                                                                            <Chip className="mpl-0" icon={<Location />} label={false} />
                                                                        </div>
                                                                        <div style={{marginLeft: "10px"}}>
                                                                            <b>{option.fromPlant}</b>
                                                                            <br></br>
                                                                            <small className="text-grey-label small-x">{option.assetId}</small>
                                                                        </div>
                                                                    </Flex>
                                                                </Flex>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                </Col>
                                                <Col span={2} style={{padding: "31px 25px"}}>
                                                    <Chip className="mpl-0" icon={<Vector />} label={false} />
                                                </Col>
                                                <Col span={5} xs={{ span: 6 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 6 }} >

                                                    <div className="box-timeline-list">
                                                        <small className="text-grey-label small-x">Transferred To</small>
                                                        <Row>
                                                            <Col span={12}  >
                                                                <Flex gap="small">
                                                                    <Flex>
                                                                        <div style={{...baselocationStyle }} >
                                                                            <Chip className="mpl-0" icon={<Location />} label={false} />
                                                                        </div>
                                                                        <div style={{marginLeft: "10px"}}>
                                                                            <b>{option.toPlant}</b>
                                                                            <br></br>
                                                                            <small className="text-grey-label small-x">{option.assetId}</small>
                                                                        </div>
                                                                    </Flex>
                                                                </Flex>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                </Col>

                                            </Row>
                                        </Timeline.Item>
                                    ))
                                    : null}
                            </Timeline>
                        </Grid>
                    </Grid>
                </Form>
            </Box>
        </>
    );
};
export default TransferList;
