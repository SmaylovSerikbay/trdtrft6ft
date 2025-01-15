"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { useState } from "react";

interface IconPickerProps {
  value?: keyof typeof Icons;
  onChange: (icon: keyof typeof Icons) => void;
  className?: string;
  label?: string;
}

function formatIconName(name: string) {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

export function IconPicker({ value, onChange, className, label }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const icons = Object.entries(Icons)
    .filter(([name]) => {
      return (
        name !== "createLucideIcon" && 
        typeof Icons[name as keyof typeof Icons] === "function" &&
        name.toLowerCase().includes(search.toLowerCase())
      );
    })
    .map(([name]) => name);

  const selectedIconName = typeof value === 'string' ? value : 'Image';
  const SelectedIcon = Icons[selectedIconName as keyof typeof Icons] || Icons.Image;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-neutral-900">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-white hover:bg-neutral-50",
              "border-neutral-200 hover:border-neutral-300",
              className
            )}
          >
            <div className="flex items-center gap-2">
              <SelectedIcon className="h-5 w-5 text-neutral-600" />
              <span className="text-sm text-neutral-600">
                {formatIconName(selectedIconName)}
              </span>
            </div>
            <Icons.ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Поиск иконки..." 
              value={search}
              onValueChange={setSearch}
              className="h-9"
            />
            <CommandEmpty className="py-6 text-sm text-center text-neutral-500">
              Иконка не найдена
            </CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {icons.map(name => {
                const IconComponent = Icons[name as keyof typeof Icons];
                return (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={() => {
                      onChange(name as keyof typeof Icons);
                      setOpen(false);
                    }}
                    className="py-2 px-4 cursor-pointer hover:bg-neutral-50"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-neutral-600" />
                      <span className="text-sm text-neutral-600">
                        {formatIconName(name)}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 