import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Grid } from '@material-ui/core';
import { NotInterestedRounded, DeleteRounded } from '@material-ui/icons';

import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';

import { ISales } from 'app/shared/model/sales.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './sales.reducer';

import './sales-delete-dialog.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #777777',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3,1,1,2),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export interface ISalesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const SalesDeleteDialog = (props: ISalesDeleteDialogProps) => {
  const styles = useStyles();

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.salesEntity.id);
  };

  const { salesEntity } = props;
  return (
    <Modal open onClose={handleClose}>
      <Grid container className={styles.modal}>
        <Grid item className="modal_header">
          <h2>
            <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
          </h2>
        </Grid>
        <Grid item className="modal_body">
          <p id="testApp.sales.delete.question" >
            <Translate contentKey="testApp.sales.delete.question" interpolate={{ id: salesEntity.id }}>
              Are you sure you want to delete this Sales?
            </Translate>
          </p>
        </Grid>
        <Grid container item justify="flex-end">
          <Button
            className={styles.button}
            type="button"
            variant="contained"
            color="default"
            onClick={handleClose}
            startIcon={<NotInterestedRounded />}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-sales"
            className={styles.button}
            type="button"
            variant="contained"
            color="secondary"
            onClick={confirmDelete}
            startIcon={<DeleteRounded />}>
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
  updateSuccess: sales.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDeleteDialog);
