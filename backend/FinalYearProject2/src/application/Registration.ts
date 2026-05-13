import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Registration from "../infrastructure/db/entities/Registration";
import RegistrationDTO from "../domain/dto/Registration";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = RegistrationDTO.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { fullName, email, password, country, interests, termsAccepted, newsletter } = parsed.data;

    const existing = await Registration.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Registration.create({
      fullName,
      email,
      password: hashedPassword,
      country,
      interests,
      termsAccepted,
      newsletter,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        interests: user.interests,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await Registration.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        interests: user.interests,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
};