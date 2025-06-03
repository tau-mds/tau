import { Button, Dialog } from "@tau/ui";
import PlusCircledIcon from "~icons/radix-icons/plus-circled";
import MagnifyingGlassIcon from "~icons/radix-icons/magnifying-glass";
import {
  type ChangeEvent,
  useState,
  type KeyboardEvent,
  useEffect,
} from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

// This component is responsible for rendering the header of the interview rounds page
export function HeaderInterviewRounds() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate({ from: "/app/interview-rounds" });
  const searchParams = useSearch({ from: "/app/interview-rounds/" });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setSearch(searchParams.search ?? "");
  }, []);

  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const handleSearchBarKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({ search: (prev) => ({ ...prev, search }) });
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">Interview Rounds</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-muted rounded-md px-3 py-1.5 shadow-sm border border-input w-full max-w-xs">
        <MagnifyingGlassIcon className="text-muted-foreground mr-2" />
        <input
          type="text"
          value={search}
          onChange={handleSearchBarChange}
          onKeyDown={handleSearchBarKeyDown}
          placeholder="Search rounds..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>
            <PlusCircledIcon />
            Create New Round
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Create New Interview Round</Dialog.Title>
            <Dialog.Description>
              Set up a new interview round for your candidates.
            </Dialog.Description>
          </Dialog.Header>
          {/* Form would go here */}
          <Dialog.Footer>
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={() =>
                navigate({
                  to: "/app/interview-rounds/create-interview-round",
                })
              }
            >
              Create Round
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
