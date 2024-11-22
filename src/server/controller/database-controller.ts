import { database } from '@src/core/database';
import { Request, Response } from 'express';

export const countryDatabaseTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const countryList = await database.all('select * from country');

    res.render('database-content/country', {
      pageTitle: 'Country Table',
      activePage: 'dashboard',
      username: '',
      data: countryList // for the table
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong!',
      error
    });
  }
};

export const subdivisionDatabaseTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await database.all('select * from subdivision');

    res.render('database-content/subdivision', {
      pageTitle: 'Sub Division Table',
      activePage: 'dashboard',
      username: '',
      data: list // for the table
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong!',
      error
    });
  }
};
