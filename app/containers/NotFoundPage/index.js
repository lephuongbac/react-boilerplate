/* eslint-disable strict,no-param-reassign */
/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default function NotFound({ staticContext }) {
  if (staticContext) {
    staticContext.status = '404';
  }
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

NotFound.propTypes = {
  staticContext: React.PropTypes.object,
};
