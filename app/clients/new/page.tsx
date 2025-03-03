'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface CompanyInfo {
  name: string;
  logo: string;
  address: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  totalIndustries: z.number().min(1, "Must have at least 1 industry"),
  totalPlants: z.number().min(1, "Must have at least 1 plant"),
  activePlants: z.number().min(0, "Active plants cannot be negative"),
})

const ourCompany: CompanyInfo = {
  name: "HITESH ENVIRO ENGINEERS PVT. LTD.",
  logo: "/fotor-2025022032529.png",
  address: "First floor, B 116, B Block, Sector 65, Noida, Uttar Pradesh 201301"
}

export default function NewClientPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      totalIndustries: 1,
      totalPlants: 1,
      activePlants: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Store in localStorage for demo purposes
    const existingClients = JSON.parse(localStorage.getItem('clients') || '[]')
    const newClient = { ...values, id: (existingClients.length + 1).toString() }
    localStorage.setItem('clients', JSON.stringify([...existingClients, newClient]))
    
    router.push('/clients')
    router.refresh()
  }

  const handleGenerateAndDownload = async (clientData: any) => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: clientData.id,
          reportType: 'summary',
          parameters: ['pH', 'COD', 'BOD', 'TSS', 'TDS', 'DO'],
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      
      if (!data.pdf) {
        throw new Error('No PDF data received');
      }

      // Convert base64 to blob
      const pdfContent = atob(data.pdf);
      const byteArray = new Uint8Array(pdfContent.length);
      for (let i = 0; i < pdfContent.length; i++) {
        byteArray[i] = pdfContent.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${clientData.name}-${new Date().toISOString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating/downloading report:", error);
      alert("Failed to generate report. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Add New Client
          </h1>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalIndustries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Industries</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalPlants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Plants</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activePlants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active Plants</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Link href="/clients">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                >
                  Create Client
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
} 