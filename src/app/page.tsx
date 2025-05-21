import AddLoginButton from "./components/addLoginButton";
import AddRegistrationButton from "./components/addRegistrationButton";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px]  items-center sm:items-start p-5">
      <h1 className="mr-auto ml-auto ">Hello! This is a booking system!</h1>
      <div className="flex justify-around w-full">
        <AddRegistrationButton />
        <AddLoginButton />
      </div>
    </main>
  );
}
