import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import AuthWrapper from '../../components/AuthWrapper';

export default function HomePage() {
  return (
    <AuthWrapper>
      <FormattedMessage {...messages.welcome} />
    </AuthWrapper>
  );
}
