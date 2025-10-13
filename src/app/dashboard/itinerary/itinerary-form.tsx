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
    required_error: 'A date is required to generate the itinerary.',
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
        title: "No Schedules Found",
        description: "There are no schedules for the selected date to generate an itinerary.",
      });
      setLoading(false);
      return;
    }

    const scalesInformation = dateSchedules
      .map(
        (s) =>
          `- ${s.startTime}-${s.endTime}: ${s.role} (${s.department}) with ${s.members.join(', ')}`
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
        console.error("Failed to generate itinerary:", error);
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: "An error occurred while generating the itinerary. Please try again.",
        })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generator Settings</CardTitle>
          <CardDescription>
            Select a date and provide any extra context for the AI.
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
                    <FormLabel>Event Date</FormLabel>
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
                              <span>Pick a date</span>
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
                    <FormLabel>Additional Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Event theme is 'Harvest'. Special guest is Pastor John."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide any extra details for the AI to consider.
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
                Generate Itinerary
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Itinerary</CardTitle>
          <CardDescription>
            The AI-generated program itinerary will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4">Generating itinerary...</p>
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
                <p className="mt-4">Your generated itinerary is just a click away.</p>
            </div>
          )}
        </CardContent>
        {result && 
          <CardFooter>
            <p className="text-xs text-muted-foreground">Itinerary generated by AI. Please review for accuracy.</p>
          </CardFooter>
        }
      </Card>
    </div>
  );
}
