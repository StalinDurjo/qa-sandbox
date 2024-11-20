import { Request, Response } from 'express';

export const countryDatabaseTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' }
    ];

    res.render('database-content/country', {
      pageTitle: 'Dashboard',
      activePage: 'dashboard',
      username: 'req.user.name',
      data: data // for the table
    });

    // res.render('database-content/country', { data });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong!',
      error
    });
  }
};
