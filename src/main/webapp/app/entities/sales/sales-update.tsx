import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Grid, Typography, FormControl, InputLabel, FilledInput, Input, TextField, Select, MenuItem } from '@material-ui/core';
import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Save, ArrowBack } from '@material-ui/icons';

import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import './sales-update.scss';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    button: {
      margin: theme.spacing(3, 1, 1)
    },
    title: {
      flexGrow: 1
    }
  }),
);

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const styles = useStyles();

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2" className={styles.title} id="sales-update_title">
          <Translate contentKey="testApp.sales.home.createOrEditLabel">Create or edit a Sales</Translate>
        </Typography>
      </Grid>
      {loading ? (
        <p>Loading...</p>
      ) : (
          <form onSubmit={() => saveEntity}>
            {!isNew ? (
              <Grid item>
                <FormControl className={styles.formControl} >
                  <InputLabel htmlFor="sales-id" className="sales-update_label">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </InputLabel>
                  <FilledInput
                    id="sales-id"
                    type="text"
                    name="id"
                    value={props.match.params.id}
                    required
                    readOnly />
                </FormControl>
              </Grid>
            ) : null}
            <Grid item>
              <FormControl className={styles.formControl}>
                <InputLabel
                  id="descriptionLabel"
                  htmlFor="sales-description"
                  className="sales-update_label">
                  <Translate contentKey="testApp.sales.description">Description</Translate>
                </InputLabel>
                <Input
                  id="sales-description"
                  type="text"
                  name="description"
                  multiline
                  rowsMax={4} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={styles.formControl}>
                <InputLabel
                  id="stateLabel"
                  htmlFor="sales-state"
                  className="sales-update_label">
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </InputLabel>
                <Select
                  labelId="sales-state"
                  id="state"
                  className="sales-update_select"
                >
                  <MenuItem value="IN_CHARGE">{translate('testApp.State.IN_CHARGE')}</MenuItem>
                  <MenuItem value="SHIPPED">{translate('testApp.State.SHIPPED')}</MenuItem>
                  <MenuItem value="DELIVERED">{translate('testApp.State.DELIVERED')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={styles.formControl}>
                <InputLabel
                  id="dateLabel"
                  htmlFor="sales-date"
                  className="sales-update_label--date">
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </InputLabel>
                <TextField
                  id="sales-date"
                  type="date"
                  className="form-control"
                  name="date" />
              </FormControl>
            </Grid>
            <Grid item>
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
              <Button
                type="submit"
                disabled={updating}
                variant="contained"
                color="primary"
                className={styles.button}
                startIcon={<Save />}
              >
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </Grid>
          </form>
        )}
    </Grid>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);

