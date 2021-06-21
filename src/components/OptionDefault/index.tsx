/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import * as Icons from 'react-icons/fa';
import { OptionProps, SingleValueProps, OptionTypeBase } from 'react-select';

import { Container } from './styles'

const OptionDefault: React.FC<OptionProps<OptionTypeBase, boolean> | SingleValueProps<OptionTypeBase>
  > = ({ innerProps, data }) => {
    const [, iconName] = data ? data.icon.split('/') : ["", null];
    const Icon = (Icons as any)[iconName];

    return (
      <Container {...innerProps}>
        <div>{data.label}</div>
        {iconName && <Icon size={20} />}
      </Container>
    );
  };

export default OptionDefault;
