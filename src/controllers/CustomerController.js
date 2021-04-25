import moment from 'moment';

import { Customer } from '../models';
import { AppError } from '../errors';

class CustomerController {
  async index(request, response) {
    const { name } = request.query;
    const messages = {
      notFound: 'No customers found',
      success: 'Customers listed successfully',
      error: 'Something happened, could not get customers',
    };

    const queryObject = {};

    if (name) {
      queryObject.full_name = { $regex: `.*${name}.*`, $options: 'i' };
    }

    let customers;

    try {
      customers = await Customer.find(queryObject)
        .select({
          _id: 1,
          full_name: 1,
          gender: 1,
          birth_date: 1,
          city: 1,
          created_at: 1,
        })
        .lean()
        .populate('city', 'name state');
    } catch (e) {
      throw new AppError(messages.error);
    }

    if (!customers.length > 0) {
      throw new AppError(messages.notFound, null, 404);
    }

    const normalizedCustomers = customers.map(customer => ({
      ...customer,
      age: moment().diff(customer.birth_date, 'years'),
    }));

    return response.json({
      message: messages.success,
      data: normalizedCustomers,
    });
  }

  async show(request, response) {
    const { customer_id: customerId } = request.params;
    const messages = {
      notFound: 'No customer found for specified value',
      success: 'Customer listed successfully',
      error: 'Something happened, could not get customer',
    };

    let customer;

    try {
      customer = await Customer.findOne({ _id: customerId })
        .select({
          _id: 1,
          full_name: 1,
          gender: 1,
          birth_date: 1,
          city: 1,
          created_at: 1,
          updated_at: 1,
        })
        .lean()
        .populate('city');
    } catch (e) {
      throw new AppError(messages.error);
    }

    if (!customer) {
      throw new AppError(messages.notFound, null, 404);
    }

    const normalizedCustomer = {
      age: moment().diff(customer.birth_date, 'years'),
      ...customer,
    };

    return response.json({
      message: messages.success,
      data: normalizedCustomer,
    });
  }

  async delete(request, response) {
    const { customer_id: customerId } = request.params;
    const messages = {
      notFound: 'No customer found for specified value',
      success: 'Customer removed successfully',
      error: 'Something happened, could not remove customer',
    };

    let customer;

    try {
      customer = await Customer.findOne({ _id: customerId }).lean();
    } catch (e) {
      throw new AppError(messages.error);
    }

    if (!customer) {
      throw new AppError(messages.notFound, null, 404);
    }

    try {
      await Customer.deleteOne({ _id: customer._id });
    } catch (e) {
      throw new AppError(messages.error);
    }

    return response.json({
      message: messages.success,
    });
  }

  async update(request, response) {
    const { customer_id: customerId } = request.params;
    const { full_name } = request.body;

    const messages = {
      notFound: 'No customer found for specified value',
      success: 'Customer updated successfully',
      error: 'Something happened, could not update customer',
    };

    let foundCustomer;

    try {
      foundCustomer = await Customer.findOne({ _id: customerId }).select({
        _id: 1,
        full_name: 1,
        created_at: 1,
        updated_at: 1,
      });
    } catch (e) {
      console.log(e);
      throw new AppError(messages.error);
    }

    if (!foundCustomer) {
      throw new AppError(messages.notFound, null, 404);
    }

    let updatedCustomer;

    try {
      foundCustomer.full_name = full_name;

      updatedCustomer = await foundCustomer.save();
    } catch (e) {
      console.log(e);
      throw new AppError(messages.error);
    }

    return response.json({
      message: messages.success,
      data: updatedCustomer,
    });
  }

  async store(request, response) {
    const { full_name, birth_date, gender, city_id } = request.body;

    const messages = {
      error: 'Something happened, the customer could not be created',
      success: 'Customer created successfully',
    };

    let createdCustomer;

    try {
      createdCustomer = await Customer.create({
        full_name,
        gender,
        birth_date,
        city: city_id,
      });
    } catch (e) {
      throw new AppError(messages.error);
    }

    return response.json({
      message: messages.success,
      data: {
        _id: createdCustomer._id,
        full_name: createdCustomer.full_name,
        gender: createdCustomer.gender,
        birth_date: createdCustomer.birth_date,
      },
    });
  }
}

export default new CustomerController();
