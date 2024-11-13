import { MockerData } from '@src/service/mock-request/mock-request';

export async function bankDetails(endpoint = '/bank-details', data: MockerData) {
  return {
    ...(await data.mocker.bankAccount.fullBankDetails())
  };
}

export async function userDetails(endpoint = '/user-details', data: MockerData) {
  return {
    ...(await data.mocker.person.fullPersonDetails())
  };
}

export async function fullUserDetails(endpoint = '/full-user-details', data: MockerData) {
  return {
    ...(await data.mocker.person.fullPersonDetails()),
    ...(await data.mocker.location.structuredAddress()),
    ...(await data.mocker.employment.fullEmploymentDetails()),
    ...(await data.mocker.bankAccount.fullBankDetails())
  };
}
