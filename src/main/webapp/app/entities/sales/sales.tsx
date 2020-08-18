import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Paper, Typography } from '@material-ui/core';
import { Visibility, Edit, Delete, Add } from '@material-ui/icons';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import './sales.scss';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  table: {
    minWidth: 650
  }
}));

export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const styles = useStyles();

  const { salesList, match, loading } = props;
  return (
    <>
      <div id="sales-heading">
        <Typography variant="h2" className={styles.title} id="sales-heading__title">
          <Translate contentKey="testApp.sales.home.title">Sales</Translate>
        </Typography>
        <Link to={`${match.url}/new`} id="jh-create-entity" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<Add />}
          >
            <Translate contentKey="testApp.sales.home.createLabel">Create new Sales</Translate>
          </Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        {salesList && salesList.length > 0 ? (
          <Table className={styles.table} size="small" aria-label="Sales table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Translate contentKey="global.field.id">ID</Translate>
                </TableCell>
                <TableCell>
                  <Translate contentKey="testApp.sales.description">Description</Translate>
                </TableCell>
                <TableCell>
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </TableCell>
                <TableCell>
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </TableCell>
                <TableCell align="center">
                  <Translate contentKey="testApp.sales.actions">Actions</Translate>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesList.map((sales, i) => (
                <TableRow key={`entity-${i}`}>
                  <TableCell align="center">
                    <Button>
                      <Link to={`${match.url}/${sales.id}`} style={{ textDecoration: 'none' }}>{sales.id}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>{sales.description}</TableCell>
                  <TableCell>
                    <Translate contentKey={`testApp.State.${sales.state}`} />
                  </TableCell>
                  <TableCell>{sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</TableCell>
                  <TableCell align="center">
                    <Link to={`${match.url}/${sales.id}`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="default"
                        size="small"
                        className={styles.button}
                        startIcon={<Visibility />}
                      >
                        View
                      </Button>
                    </Link>
                    <Link to={`${match.url}/${sales.id}/edit`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.button}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Link to={`${match.url}/${sales.id}/delete`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={styles.button}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
              </div>
            )
          )}
      </TableContainer>
    </>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);