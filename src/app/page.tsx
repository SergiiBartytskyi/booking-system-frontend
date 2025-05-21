import RegistrationForm from "./components/registration-form";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Hello! This is a booking system!</h1>
      <RegistrationForm />
    </main>
  );
}
