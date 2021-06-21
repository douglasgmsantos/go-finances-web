/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import * as Icons from 'react-icons/fa';
import { OptionProps, SingleValueProps, OptionTypeBase } from 'react-select';

import { Container } from './styles'

const CategoryUserOption: React.FC<OptionProps<OptionTypeBase, boolean> | SingleValueProps<OptionTypeBase>
  > = ({ innerProps, data }) => {

    const [, iconName] = data && Object.keys(data).indexOf("__isNew__") == -1 ? data.icon.split('/') : ["", "FaMoneyBillAlt"];
    const Icon = (Icons as any)[iconName];

    return (
      data.__isNew__ ?
        (
          <Container {...innerProps}>
            <div>{data.label}</div>
            <Icon size={20} />
          </Container>
        )
        : (
          <Container {...innerProps}>
            <div>{data.title}</div>
            <Icon size={20} />
          </Container>
        )
    );
  };

export default CategoryUserOption;
