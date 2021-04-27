import { City } from '../models';
import { AppError } from '../errors';

class CityController {
  async index(request, response) {
    const { state, city } = request.query;
    const messages = {
      notFound: 'No cities found',
      success: 'Cities listed successfully',
      error: 'Something happened, could not get cities',
    };

    const queryObject = {};

    if (state) {
      queryObject.state = { $regex: `.*${state}.*`, $options: 'i' };
    }
    if (city) {
      queryObject.name = { $regex: `.*${city}.*`, $options: 'i' };
    }

    let cities;

    try {
      cities = await City.find(queryObject)
        .select({
          _id: 1,
          name: 1,
          state: 1,
          created_at: 1,
        })
        .lean();
    } catch (e) {
      throw new AppError(messages.error);
    }

    if (!cities.length > 0) {
      throw new AppError(messages.notFound, null, 404);
    }

    return response.json({
      message: messages.success,
      data: cities,
    });
  }

  async store(request, response) {
    const { name, state } = request.body;
    const messages = {
      error: 'Something happened, the city could not be created',
      success: 'City created successfully',
      found: 'City already exists',
    };

    let createdCity;
    let foundCity;

    try {
      foundCity = await City.findOne({ name, state }).lean();
    } catch (e) {
      throw new AppError(messages.error);
    }

    if (foundCity) {
      throw new AppError(messages.found);
    }

    try {
      createdCity = await City.create({
        name,
        state,
      });
    } catch (e) {
      throw new AppError(messages.error);
    }

    return response.json({
      message: messages.success,
      data: {
        _id: createdCity._id,
        name: createdCity.name,
        state: createdCity.state,
      },
    });
  }
}

export default new CityController();
