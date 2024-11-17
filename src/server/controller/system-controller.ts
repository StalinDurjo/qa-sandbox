import {Request, Response} from "express";

export const baseUrlFunction = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'OK!' });
  } catch (error) {
    res.status(400).json({
      message: '',
      error
    });
  }
};

export const healthStatus = async (req: Request, res: Response): Promise<void> => {
  try{
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }catch(error){
    res.status(400).json({
      message: 'Something went wrong!',
      error
    });
  }
};