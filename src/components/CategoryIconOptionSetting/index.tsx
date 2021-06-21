/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import * as Icons from 'react-icons/fa';
import { OptionProps, SingleValueProps, OptionTypeBase } from 'react-select';

import { Container } from "../../styles/components/configuracoes/CategoryIconOptionSetting/styles";

const CategoryIconOptionConfig: React.FC<OptionProps<OptionTypeBase, boolean> | SingleValueProps<OptionTypeBase>
  > = ({ innerProps, data }) => {
    const [, iconName] = data ? data.id.split('/') : ["", "FaMoneyBillAlt"];
    const Icon = (Icons as any)[iconName];

    return (
      <Container {...innerProps}>
        <Icon size={20} />
      </Container>
    );
  };

export default CategoryIconOptionConfig;
