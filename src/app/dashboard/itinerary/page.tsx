import { ItineraryForm } from "./itinerary-form";

export default function ItineraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-headline tracking-tight">
          AI Itinerary Generator
        </h1>
        <p className="text-muted-foreground">
          Create a complete program itinerary for any event date using AI.
        </p>
      </div>
      <ItineraryForm />
    </div>
  );
}
