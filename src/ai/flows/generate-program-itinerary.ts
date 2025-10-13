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
      'A data para a qual gerar o roteiro do programa (YYYY-MM-DD)'
    ),
  scalesInformation: z.string().describe('Informações detalhadas sobre as escalas para a data especificada.'),
  additionalContext: z.string().optional().describe('Contexto adicional ou instruções para a geração do roteiro.'),
});
export type GenerateProgramItineraryInput = z.infer<typeof GenerateProgramItineraryInputSchema>;

const GenerateProgramItineraryOutputSchema = z.object({
  itinerary: z.string().describe('O roteiro do programa gerado para a data especificada.'),
});
export type GenerateProgramItineraryOutput = z.infer<typeof GenerateProgramItineraryOutputSchema>;

export async function generateProgramItinerary(input: GenerateProgramItineraryInput): Promise<GenerateProgramItineraryOutput> {
  return generateProgramItineraryFlow(input);
}

const generateProgramItineraryPrompt = ai.definePrompt({
  name: 'generateProgramItineraryPrompt',
  input: {schema: GenerateProgramItineraryInputSchema},
  output: {schema: GenerateProgramItineraryOutputSchema},
  prompt: `Você é um assistente de IA projetado para gerar um roteiro de programa para um evento de igreja em uma data específica.

  Dadas as informações da agenda e qualquer contexto adicional, crie um roteiro de programa detalhado e bem organizado.
  O roteiro deve incluir o horário, o departamento responsável e os detalhes da atividade para cada item da agenda.
  Otimize para clareza, fluidez e engajamento.

  Data: {{{date}}}
  Informações da Agenda: {{{scalesInformation}}}
  Contexto Adicional: {{{additionalContext}}}

  Por favor, gere o roteiro do programa:
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
