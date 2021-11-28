import React, { FC } from 'react';
import { CreateOrganization, OrganizationsList } from '../components';

export const Organizations: FC = () => (
  <>
    <CreateOrganization />
    <OrganizationsList />
  </>
);
