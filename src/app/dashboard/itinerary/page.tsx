import { ItineraryForm } from "./itinerary-form";

export default function ItineraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-headline tracking-tight">
          Gerador de Roteiro com IA
        </h1>
        <p className="text-muted-foreground">
          Crie um roteiro de programa completo para qualquer data de evento usando IA.
        </p>
      </div>
      <ItineraryForm />
    </div>
  );
}
