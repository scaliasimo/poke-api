import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: rgb(22, 107, 240);
  border-radius: 5px;
`;

const ProgressBar = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarFill style={{ width: `${percentage}%` }} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
