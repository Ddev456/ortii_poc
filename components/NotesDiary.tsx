'use client';

import { useState } from 'react';
import z from 'zod';
import { useToast } from "@/hooks/use-toast";
import {
    Bird,
    Rabbit,
    Settings,
    Share,
    SquarePlus,
    Turtle,
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"

import { MultiSelect } from './ui/multi-select';
import { plants } from '@/app/wiki/plants';
import { DatePicker } from './ui/date-picker';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { NoteList } from './NoteList';
import Image from 'next/image';

  export interface Note {
    content: string;
    plants: string[];
    tags: string[];
    date: Date;
  }

  const availableTags = [
    "Potager",
    "Plantation",
    "Culture",
    "Récolte",
    "Semis",
    "Observations",
    "Ravageurs & maladies"
  ]

  export const description =
    "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."
  
  export function NotesDiary() {

const formSchema = z.object({
  content: z.string().min(1),
  plants: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  date: z.date(),
})

    const { toast } = useToast();

    const [notes, setNotes] = useState<Note[]>([]);

    const handleAddNote = (note: Note) => {
      setNotes((prevNotes) => [...prevNotes, note]);
    };

  const groupedNotes = notes.reduce((acc, note) => {
    const week = note.date.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!acc[week]) acc[week] = [];
    acc[week].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      plants: [],
      tags: [],
      date: new Date(),
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    handleAddNote(data);
    form.reset();
}

    return (
      <>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <Image src="/__logo.svg" alt="ortii" width={35} height={35} />
              <span>Carnet Potager</span></h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Paramètres</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                  <DrawerTitle>Configuration</DrawerTitle>
                  <DrawerDescription>
                    Configure the settings for the model and messages.
                  </DrawerDescription>
                </DrawerHeader>
                <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Settings
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="model">Model</Label>
                      <Select>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="genesis">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Rabbit className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Genesis
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Our fastest model for general use cases.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="explorer">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Bird className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Explorer
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Performance and speed for efficiency.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="quantum">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Turtle className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Quantum
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  The most powerful model for complex
                                  computations.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="number" placeholder="0.4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Date</Label>
                      <DatePicker />
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Messages
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" placeholder="You are a..." />
                    </div>
                  </fieldset>
                </form>
              </DrawerContent>
            </Drawer>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Share className="size-3.5" />
              Télécharger
            </Button>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
            >
              <Form {...form}>
              <form className="grid w-full items-start gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Paramètres
                  </legend>
                  <div className="grid gap-3">

        <FormField
          control={form.control}
          name="plants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plantes</FormLabel>
              <FormControl>
                <>
              <MultiSelect
              value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      options={plants.map(plant => ({ value: plant.name, label: plant.name }))}
                      defaultValue={field.value}
                      placeholder="Sélectionner une ou plusieurs plantes"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />              
                    </>
                    </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
                   
                  </div>
                  <div className="grid gap-3">
                  <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags / Mots-clés</FormLabel>
              <FormControl>
                <MultiSelect
                value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      options={availableTags.map(tag => ({ value: tag, label: tag }))}
                      defaultValue={field.value}
                      placeholder="Sélectionner des mots-clés"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                
       
          </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker 
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                      
                    </div>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Note
                  </legend>
                  <div className="grid gap-3">
                    <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu (max: 700 caractères par note)</FormLabel>
              <FormControl>
                <Textarea
                maxLength={700}
                  {...field}
                  placeholder="Note et observations du jardin .."
                  className="min-h-[7rem]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Button variant="outline" className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200">
                      <SquarePlus  className="size-4" />
                      Ajouter
                  </Button>

                  </div>
                </fieldset>
              </form>
              </Form>
            </div>
          
            <div className="relative flex h-full min-h-[30vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Journal
              </Badge>
              <div className="flex-1">
      
    
      
      <NoteList notes={notes} />


              </div>
            </div>
          </main>
          </div>
          </>
          )
        }

  