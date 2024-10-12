import Mocker from '@src/service/mocker/mocker';
import { Request, Response } from 'express';

export const generateMockData = async (req: Request, res: Response) => {
  try {
    const mock = {};
    // const { project, actionName, repeat } = req.body;
    const mocker = await new Mocker({ locale: 'US' }).initialize();

    mock['firstName'] = await mocker.person.firstName();
    mock['lastName'] = await mocker.person.lastName();
    mock['lastEmail'] = await mocker.person.email();
    mock['phoneNumber'] = await mocker.person.phoneNumber();
    mock['nationality'] = await mocker.person.nationality();
    mock['dateOfBirth'] = await mocker.person.dateOfBirth();
    mock['age'] = await mocker.person.age();

    mock['country'] = await mocker.location.countryName();
    mock['division'] = await mocker.location.division();
    mock['subdivision'] = await mocker.location.subdivision();
    mock['city'] = await mocker.location.city();
    mock['streetAddress'] = await mocker.location.streetAddress();
    mock['postCode'] = await mocker.location.postcode();
    mock['fullAddress'] = await mocker.location.fullAddress();

    mock['bankAccountType'] = await mocker.bankAccount.accountType();
    mock['bankCurrency'] = await mocker.bankAccount.currency();

    res.status(200).send({
      status: 'Random Mock Data',
      data: mock
    });
  } catch (error) {
    res.status(400).send({
      message: 'Something went wrong while running action.',
      error: error
    });
  }
};
