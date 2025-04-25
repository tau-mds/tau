import { createFileRoute } from "@tanstack/react-router";
import AppointmentForm from "../../components/appointment-form";

export const Route = createFileRoute("/create-appointment/")({
  component: CreateAppointmentComponent,
});

function CreateAppointmentComponent() {
  return (
    <div>
      <AppointmentForm />
    </div>
  );
}
