'use server';

/**
 * @fileOverview Generates a program itinerary for a specific date, combining schedule information and AI-driven content organization.
 *
 * - generateProgramItinerary - A function that generates a program itinerary for a given date.
 * - GenerateProgramItineraryInput - The input type for the generateProgramItinerary function.
 * - GenerateProgramItineraryOutput - The return type for the generateProgramItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProgramItineraryInputSchema = z.object({
  date: z
    .string()
    .describe(
      'The date for which to generate the program itinerary (YYYY-MM-DD)'
    ),
  scalesInformation: z.string().describe('Detailed information about the schedules for the specified date.'),
  additionalContext: z.string().optional().describe('Additional context or instructions for itinerary generation.'),
});
export type GenerateProgramItineraryInput = z.infer<typeof GenerateProgramItineraryInputSchema>;

const GenerateProgramItineraryOutputSchema = z.object({
  itinerary: z.string().describe('The generated program itinerary for the specified date.'),
});
export type GenerateProgramItineraryOutput = z.infer<typeof GenerateProgramItineraryOutputSchema>;

export async function generateProgramItinerary(input: GenerateProgramItineraryInput): Promise<GenerateProgramItineraryOutput> {
  return generateProgramItineraryFlow(input);
}

const generateProgramItineraryPrompt = ai.definePrompt({
  name: 'generateProgramItineraryPrompt',
  input: {schema: GenerateProgramItineraryInputSchema},
  output: {schema: GenerateProgramItineraryOutputSchema},
  prompt: `You are an AI assistant designed to generate a program itinerary for a church event on a specific date.

  Given the schedule information and any additional context, create a detailed and well-organized program itinerary.
  The itinerary should include the timing, department responsible, and activity details for each item on the schedule.
  Optimize for clarity, flow, and engagement.

  Date: {{{date}}}
  Schedule Information: {{{scalesInformation}}}
  Additional Context: {{{additionalContext}}}

  Please generate the program itinerary:
  `,
});

const generateProgramItineraryFlow = ai.defineFlow(
  {
    name: 'generateProgramItineraryFlow',
    inputSchema: GenerateProgramItineraryInputSchema,
    outputSchema: GenerateProgramItineraryOutputSchema,
  },
  async input => {
    const {output} = await generateProgramItineraryPrompt(input);
    return output!;
  }
);
