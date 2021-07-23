import React, { Fragment } from 'react';
import { Tooltip, IconButton, Chip, Theme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Grid as TableGrid,
  CSVExporter,
  HeadCell,
  IDataResponse,
  CSVColumn,
} from '../../core';
import { CustomerModel } from 'models';
import { IService } from 'interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginLeft: theme.spacing(1),
    },
  }),
);

interface CustomersListMaterialProps {
  rowsData: IDataResponse;
}

export const CustomersListMaterial: React.FC<CustomersListMaterialProps> = ({
  rowsData,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const headCells: HeadCell<CustomerModel>[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
      sort: true,
    },
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Phone',
      sort: true,
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
      sort: true,
    },
    {
      id: 'favoriteServices',
      numeric: false,
      disablePadding: false,
      label: 'Services',
      sort: false,
      content: ({ favoriteServices }: CustomerModel) => {
        return (
          <Fragment>
            {favoriteServices.map(({ id, name }: IService, index: number) => (
              <Chip
                className={classes.chip}
                size="small"
                key={`${id}-${index}`}
                icon={<TagFacesIcon />}
                label={name}
              />
            ))}
          </Fragment>
        );
      },
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Action',
      sort: false,
      content: (customer: CustomerModel) => {
        const { id } = customer;
        return (
          <div>
            <Tooltip title="Edit" placement="top">
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: `/customers/${id}/update`,
                    state: customer,
                  })
                }
                size="small"
              >
                <EditOutlinedIcon htmlColor="#838383" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const columns = headCells
    .filter((cell) => cell.id !== 'action')
    .map(({ id, label }: HeadCell) => ({
      id,
      displayName: label,
    }));

  return (
    <Fragment>
      <TableGrid
        Model={CustomerModel}
        rowsData={rowsData}
        headCells={headCells}
        tableTitle="Customers List"
        withSelection={false}
        withPagination={false}
        orderByKey="name"
        csvExporter={
          <CSVExporter
            datas={rowsData?.data?.map((customer) => ({
              ...customer,
              favoriteServices: customer?.favoriteServices
                ?.map((service: IService) => service.name)
                .join(', '),
            }))}
            columns={columns as CSVColumn[]}
            fileName={`Moonmin_Customers_${new Date().toLocaleDateString()}`}
          />
        }
      />
    </Fragment>
  );
};
