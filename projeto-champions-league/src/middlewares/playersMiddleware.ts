import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function validatePlayerIdParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (
    !id ||
    isNaN(Number(id)) ||
    Number(id) <= 0 ||
    !Number.isInteger(Number(id))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid player id parameter." });
  }
  next();
}

export function validatePlayerBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, position, age, team } = req.body;

  if (typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Name is required and must be a non-empty string." });
  }

  if (typeof position !== "string" || position.trim().length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Position is required and must be a non-empty string." });
  }

  if (typeof age !== "number" || age <= 0 || !Number.isInteger(age)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Age is required and must be a positive integer." });
  }

  if (typeof team !== "string" || team.trim().length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Team is required and must be a non-empty string." });
  }

  next();
}
