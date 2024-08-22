import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Popconfirm } from 'antd';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid, Button } from '../../../../node_modules/@mui/material/index';
import AddClassChecklist from './AddClassChecklist';
import UpdateClassChecklist from './UpdateClassChecklist';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        // <Box sx={{ p: 1, }}>
        <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default function ViewClassChecklist({ onRowClick, ShowOption, selectedData }) {
  const handleBackButtonClick = () => {
    onRowClick();
  };
  const SetEditOpen = () => {
    setShowingOption('Edit');
  };

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  const [ShowingOption, setShowingOption] = React.useState();


  React.useEffect(() => {
    setShowingOption(ShowOption);
  }, [ShowOption]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box className="tob-cen pad-header">
        <Grid>
          {' '}
          <KeyboardBackspaceIcon className="arrow-back" onClick={handleBackButtonClick} />{' '}
        </Grid>
        <Grid sx={{ fontSize: '12px', color: '#919EAB' }}>
          {ShowingOption === 'View' ? (
            <>
              <Button onClick={SetEditOpen}>Edit</Button>
              <Popconfirm
                title="Delete the checklist"
                description="Are you sure to delete this checklist?"
                onConfirm={confirm}
                onOpenChange={() => console.log('open change')}
              >
                <Button>Delete</Button>
              </Popconfirm>
            </>
          ) : null}
        </Grid>
      </Box>
      {ShowOption === 'Add' ? <AddClassChecklist /> : <UpdateClassChecklist selectedAsset={selectedData} editAble={ShowingOption} />}
    </Box>
  );
}
