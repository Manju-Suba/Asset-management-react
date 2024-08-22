import * as React from 'react';
import { Card } from '../../../node_modules/@mui/material/index';
import AssetDisposedheader from './AssetAuditDisposed/AssetDisposedheader';
import AuditDisposedHeader from './AssetAuditDisposed/AuditDisposedHeader';
import ComponentSkeleton from './ComponentSkeleton';

const AuditDisposed = () => {
  const [isRowClicked, setIsRowClicked] = React.useState(false);
  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked); // Update state when a row is clicked
  };
  return (
    <ComponentSkeleton>
      {!isRowClicked && (
        <>
          <Card className="margin-bottom-20px" sx={{ width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
            <AssetDisposedheader />
          </Card>
        </>
      )}
      <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
        <AuditDisposedHeader onRowClick={handleRowClick} />
      </Card>
    </ComponentSkeleton>
  );
};

export default AuditDisposed;
