import { Card } from '../../../node_modules/@mui/material/index';
import AuditHeader from './AssetAudit/AuditHeader';
import ComponentSkeleton from './ComponentSkeleton';

const AssetAudit = () => {
  return (
    <ComponentSkeleton>
      <Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
        <AuditHeader />
      </Card>
    </ComponentSkeleton>
  );
};

export default AssetAudit;
