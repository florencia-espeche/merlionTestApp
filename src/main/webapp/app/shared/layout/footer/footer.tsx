import React from 'react';
import { Translate } from 'react-jhipster';

import { Grid, Typography } from '@material-ui/core';
import { CopyrightRounded } from '@material-ui/icons';

import './footer.scss';

const Footer = props => {

  return (
    <footer className="footer page-content">
      <Grid container justify="center" className="footer_container--legal">
        <Typography variant="body1">
          <span><Translate contentKey="legal">All rights reserved</Translate></span>&nbsp;<CopyrightRounded fontSize="small" />&nbsp;2020 Merlion Techs
        </Typography>
      </Grid>
    </footer>
  );
};

export default Footer;
