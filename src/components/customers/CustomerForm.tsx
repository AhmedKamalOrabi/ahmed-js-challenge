import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { CustomerModel } from '../../models';
import { IService } from '../../interfaces';
import {
  FormInput,
  emailRegex,
  phoneRegex,
  AutoComplete,
  FormButton,
  Loader,
} from '../../core';
import { getServices, createCustomer, updateCustomer } from '../../api';
import { withDependencies } from '../../dependencyProvider';
import { CustomerStore } from '../../store/CustomerStore';
import { translate } from '../../constants';

interface CustomerFormProps {
  customerStore: CustomerStore;
  customer?: CustomerModel;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customerStore,
  customer,
}) => {
  const history = useHistory();
  const { enqueueSnackbar: alert } = useSnackbar();
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isUdpateMode = Boolean(customer);
  const { register, handleSubmit, control, errors, setError, watch } =
    useForm<CustomerModel>({
      mode: 'onBlur',
      defaultValues: customer ? customer : new CustomerModel(),
    });

  const favoriteServices = watch('favoriteServices', []);

  const onSubmit = async (formData: CustomerModel) => {
    setLoading(true);
    try {
      if (!isUdpateMode) {
        const newCustomer = await createCustomer(formData);
        alert('Customer is added successfully', {
          persist: false,
          variant: 'success',
        });
        await customerStore.addNewCustomer(newCustomer);
        history.push('/customers');
      } else {
        const { id } = customer as CustomerModel;
        const updatedCustomer = await updateCustomer(id, formData);
        alert('Customer is updated successfully', {
          persist: false,
          variant: 'success',
        });
        await customerStore.updateExistCustomer(updatedCustomer);
      }
    } catch (errors) {
      Object.keys(errors).forEach((key) => {
        setError(key, {
          type: 'manual',
          message: errors[key],
        });
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    const services = await getServices();
    setServices(services);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Fragment>
      <Loader open={loading} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormInput
            name="name"
            label="Name"
            placeholder="Enter customer name"
            required
            gridClasses={{ xs: 12, sm: 6 }}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
            outline={true}
            size="small"
            inputRef={register({
              required: translate('customer.error.name'),
            })}
          />
          <FormInput
            type="email"
            name="email"
            label="Email"
            placeholder="Enter customer email"
            required
            gridClasses={{ xs: 12, sm: 6 }}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            outline={true}
            size="small"
            inputRef={register({
              required: translate('customer.error.email'),
              pattern: {
                value: emailRegex,
                message: translate('customer.error.email.invalid'),
              },
            })}
          />
          <FormInput
            name="phone"
            label="Phone"
            placeholder="Enter customer phone"
            required
            gridClasses={{ xs: 12, sm: 6 }}
            error={errors.phone ? true : false}
            helperText={errors.phone?.message}
            outline={true}
            size="small"
            inputRef={register({
              required: translate('customer.error.phone'),
              pattern: {
                value: phoneRegex,
                message: translate('customer.error.phone.invalid'),
              },
            })}
          />
          <AutoComplete
            gridClasses={{ xs: 12, sm: 6 }}
            control={control}
            name="favoriteServices"
            label="Favorite Services"
            error={errors.favoriteServices ? true : false}
            outline={true}
            size="small"
            textProperty="name"
            valueProperty="id"
            options={services}
            multiple={true}
            disableCloseOnSelect={true}
            limitTags={2}
            placeholder="Select one or more service"
            id="favorite-services"
            defaultValue={favoriteServices}
          />
          <FormButton gridClasses={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <SaveIcon />{' '}
            <span>
              {isUdpateMode
                ? translate('customer.button.update')
                : translate('customer.button.create')}
            </span>
          </FormButton>
        </Grid>
      </form>
    </Fragment>
  );
};

export default withDependencies({
  customerStore: 'customerStore',
})(observer(CustomerForm));
