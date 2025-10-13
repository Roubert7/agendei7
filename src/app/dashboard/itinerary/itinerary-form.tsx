'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format, formatISO } from 'date-fns';
import { Loader2, CalendarIcon, Wand2 } from 'lucide-react';
import { marked } from 'marked';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  generateProgramItinerary,
  type GenerateProgramItineraryOutput,
} from '@/ai/flows/generate-program-itinerary';
import { schedules } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  date: z.date({
    required_error: 'Uma data é necessária para gerar o roteiro.',
  }),
  additionalContext: z.string().optional(),
});

export function ItineraryForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateProgramItineraryOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    const dateSchedules = schedules.filter(
      (s) => s.date.toDateString() === values.date.toDateString()
    );

    if (dateSchedules.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhuma Agenda Encontrada",
        description: "Não há agendas para a data selecionada para gerar um roteiro.",
      });
      setLoading(false);
      return;
    }

    const scalesInformation = dateSchedules
      .map(
        (s) =>
          `- ${s.startTime}-${s.endTime}: ${s.role} (${s.department}) com ${s.members.join(', ')}`
      )
      .join('\n');

    try {
      const output = await generateProgramItinerary({
        date: formatISO(values.date, { representation: 'date' }),
        scalesInformation,
        additionalContext: values.additionalContext,
      });
      setResult(output);
    } catch (error) {
        console.error("Falha ao gerar roteiro:", error);
        toast({
            variant: "destructive",
            title: "Falha na Geração",
            description: "Ocorreu um erro ao gerar o roteiro. Por favor, tente novamente.",
        })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Gerador</CardTitle>
          <CardDescription>
            Selecione uma data e forneça qualquer contexto extra para a IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Evento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contexto Adicional</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: O tema do evento é 'Colheita'. O convidado especial é o Pastor João."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Forneça quaisquer detalhes extras para a IA considerar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Gerar Roteiro
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Roteiro Gerado</CardTitle>
          <CardDescription>
            O roteiro do programa gerado pela IA aparecerá aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4">Gerando roteiro...</p>
            </div>
          )}
          {result && (
             <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(result.itinerary) }}
            />
          )}
          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                <Wand2 className="h-12 w-12" />
                <p className="mt-4">Seu roteiro gerado está a apenas um clique de distância.</p>
            </div>
          )}
        </CardContent>
        {result && 
          <CardFooter>
            <p className="text-xs text-muted-foreground">Roteiro gerado por IA. Por favor, revise para precisão.</p>
          </CardFooter>
        }
      </Card>
    </div>
  );
}
