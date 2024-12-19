import { Typography, Box, Link as MuiLink } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

//useNavigate , pageRoutes를 사용함! - 이것에 대한 검증은 불필요함
// 그리고 이 컴포넌트는 각자 단순하게 한 기능만 사용하므로 단위테스트에 적합하다
const EmptyNotice = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(pageRoutes.main);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: 400,
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ fontSize: '50px', fontWeight: 'light' }}>
        텅~
      </Typography>
      <MuiLink
        underline="hover"
        onClick={handleClickBack}
        style={{ cursor: 'pointer' }}
        role="link"
      >
        홈으로 가기
      </MuiLink>
    </Box>
  );
};

export default EmptyNotice;
