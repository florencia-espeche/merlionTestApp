import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Typography, Button, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Edit, ArrowBack } from '@material-ui/icons';

import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import './sales-detail.scss';

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    }
  }),
);

export const SalesDetail = (props: ISalesDetailProps) => {
  const styles = useStyles();

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salesEntity } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Typography variant="h2" className={styles.title} id="sales-detail_title">
          <Translate contentKey="testApp.sales.detail.title">Sales</Translate> [<b>{salesEntity.id}</b>]
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={<Translate contentKey="testApp.sales.description">Description</Translate>}
              secondary={salesEntity.description}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Translate contentKey="testApp.sales.state">State</Translate>}
              secondary={salesEntity.state}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Translate contentKey="testApp.sales.date">Date</Translate>}
              secondary={salesEntity.date ? <TextFormat value={salesEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
            />
          </ListItem>
        </List>
        <Link to="/sales" style={{ textDecoration: 'none' }}>
          <ColorButton
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<ArrowBack />}
          >
            <Translate contentKey="entity.action.back">Back</Translate>
          </ColorButton>
        </Link>
        <Link to={`/sales/${salesEntity.id}/edit`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<Edit />}
          >
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </Button>
        </Link>
      </Grid>
    </Grid >
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
