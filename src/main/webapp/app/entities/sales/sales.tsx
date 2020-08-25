import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Typography } from '@material-ui/core';
import { Visibility, Edit, Delete, Add } from '@material-ui/icons';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import './sales.scss';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#2a6a9e",
      color: theme.palette.common.white,
      padding: 18,
      fontSize: 20
    },
    body: {
      fontSize: 16,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,

      },
    },
  })
)(TableRow);

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
            className={styles.button}
            startIcon={<Add />}

          >
            <Translate contentKey="testApp.sales.home.createLabel">Create new Sales</Translate>
          </Button>
        </Link>
      </div>
      <TableContainer>
        {salesList && salesList.length > 0 ? (
          <Table
            className={styles.table}
            size="small"
            aria-label="Sales table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" >
                  <Translate contentKey="global.field.id">ID</Translate>
                </StyledTableCell>
                <StyledTableCell>
                  <Translate contentKey="testApp.sales.description">Description</Translate>
                </StyledTableCell>
                <StyledTableCell>
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </StyledTableCell>
                <StyledTableCell>
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Translate contentKey="testApp.sales.actions">Actions</Translate>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesList.map((sales, i) => (
                <StyledTableRow key={`entity-${i}`} hover={true}>
                  <StyledTableCell align="center">
                    <Button>
                      <Link to={`${match.url}/${sales.id}`} style={{ textDecoration: 'none' }}>{sales.id}</Link>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>{sales.description}</StyledTableCell>
                  <StyledTableCell>
                    <Translate contentKey={`testApp.State.${sales.state}`} />
                  </StyledTableCell>
                  <StyledTableCell>{sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`${match.url}/${sales.id}`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="default"
                        size="small"
                        className={styles.button}
                        startIcon={<Visibility />}
                      >
                        <Translate contentKey="testApp.sales.view">View</Translate>
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
                        <Translate contentKey="testApp.sales.edit">Edit</Translate>
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
                        <Translate contentKey="testApp.sales.delete-button">Delete</Translate>
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
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