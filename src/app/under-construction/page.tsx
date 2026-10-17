import { UnderConstruction } from "@/components/under-construction";

export const metadata = { title: "Under construction" };

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <UnderConstruction />
    </main>
  );
}
