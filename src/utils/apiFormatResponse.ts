import { Response } from 'express';

type ApiFormatResponse = {
  status: number;
  message?: string;
  success?: boolean;
  data?: any;
  res: Response
}

export async function apiFormatResponse ({
  status,
  message,
  success,
  data,
  res
}: ApiFormatResponse) {
  try {
    return res.status(status).json({
      message,
      success: Boolean(success),
      data,
      status: Number(status),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};