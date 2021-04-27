import { City, Customer } from '../../src/models';

async function customerSeed() {
  const recifeCity = await City.findOne({ name: 'Recife' })
    .select({ _id: 1 })
    .lean();
  const jpCity = await City.findOne({ name: 'João Pessoa' })
    .select({ _id: 1 })
    .lean();
  const fortalCity = await City.findOne({ name: 'Fortaleza' })
    .select({ _id: 1 })
    .lean();

  const customersArray = [
    {
      full_name: 'Augusto',
      birth_date: '1991-03-11',
      gender: 'male',
      city: recifeCity._id,
    },
    {
      full_name: 'Carol',
      birth_date: '1998-04-25',
      gender: 'female',
      city: jpCity._id,
    },
    {
      full_name: 'Marcelo',
      birth_date: '1981-11-09',
      gender: 'other',
      city: fortalCity._id,
    },
  ];
  return Promise.all(customersArray.map(customer => Customer.create(customer)));
}

export default customerSeed;
