import * as z from "zod";

export const InterestSchema = z.object({
  interest: z
    .array(z.string())
    .nonempty("Please select at least one interest."),
});
