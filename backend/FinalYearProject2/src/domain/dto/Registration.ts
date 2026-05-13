
import { z } from "zod";

 const RegistrationDTO = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  country: z.string().default("United States"),
  interests: z.array(z.enum(["culture", "beach", "wildlife", "adventure", "food"])).default([]),
  termsAccepted: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
  newsletter: z.boolean().default(false),
});
export default RegistrationDTO;