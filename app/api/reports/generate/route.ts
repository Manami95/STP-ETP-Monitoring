import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { Buffer } from 'buffer'

interface CompanyInfo {
  name: string;
  logo: string;
  address: string;
}

// Mock company info - Replace with actual data from your database
const ourCompany: CompanyInfo = {
  name: "HITESH ENVIRO ENGINEERS PVT. LTD.",
  logo: "/fotor-2025022032529.png", // Replace with actual logo path
  address: "First floor, B 116, B Block, Sector 65, Noida, Uttar Pradesh 201301"
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyId, reportType, parameters, startDate, endDate } = body

    // Create a new PDF document
    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    // Collect PDF chunks
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    
    // Header Section
    doc.image(ourCompany.logo, 50, 45, { width: 50 })
      .fontSize(20)
      .text(ourCompany.name, 110, 50)
      .fontSize(10)
      .text(ourCompany.address, 110, 70)
      .moveDown()

    // Divider
    doc.moveTo(50, 100)
       .lineTo(550, 100)
       .stroke()
       .moveDown()

    // Client Information
    doc.fontSize(14)
       .text('Report Details', 50, 120)
       .fontSize(10)
       .text(`Client: ${getClientName(companyId)}`, 50, 140)
       .text(`Report Type: ${reportType}`, 50, 155)
       .text(`Date Range: ${formatDateRange(startDate, endDate, reportType)}`, 50, 170)
       .moveDown()

    // Parameters Section
    doc.fontSize(14)
       .text('Parameter Readings', 50, 200)
       .moveDown()

    // Create table headers
    const tableTop = 230
    doc.fontSize(10)
       .text('Parameter', 50, tableTop)
       .text('Reading', 200, tableTop)
       .text('Unit', 300, tableTop)
       .text('Standard Range', 400, tableTop)

    // Mock parameter data - Replace with actual readings from your database
    const readings = await getParameterReadings(companyId, parameters, startDate, endDate)
    
    // Add parameter readings
    let yPosition = tableTop + 20
    readings.forEach((reading) => {
      doc.text(reading.parameter, 50, yPosition)
         .text(reading.value.toString(), 200, yPosition)
         .text(reading.unit, 300, yPosition)
         .text(reading.standardRange, 400, yPosition)
      yPosition += 20
    })

    // Footer
    doc.fontSize(8)
       .text(
         `Generated on ${new Date().toLocaleString()}`,
         50,
         doc.page.height - 50,
         { align: 'center' }
       )

    // Finalize the PDF
    doc.end()

    // Wait for PDF generation to complete
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })

    // Generate report metadata
    const report = {
      id: Math.random().toString(36).substring(7),
      name: `${getClientName(companyId)} - ${reportType} Report`,
      date: new Date().toISOString(),
      type: reportType,
      status: 'completed',
      pdf: pdfBuffer.toString('base64')
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    )
  }
}

// Helper functions
function getClientName(companyId: string): string {
  // Mock function - Replace with actual database query
  const companies = {
    "1": "Company A",
    "2": "Company B",
    "3": "Company C"
  }
  return companies[companyId as keyof typeof companies] || "Unknown Company"
}

function formatDateRange(startDate: string, endDate: string, reportType: string): string {
  if (reportType === "daily") {
    return new Date(startDate).toLocaleDateString()
  }
  return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
}

async function getParameterReadings(
  companyId: string,
  parameters: string,
  startDate: string,
  endDate: string
) {
  // Mock function - Replace with actual database query
  return [
    { parameter: "pH", value: 7.2, unit: "pH", standardRange: "6.5 - 8.5" },
    { parameter: "COD", value: 150, unit: "mg/L", standardRange: "< 250 mg/L" },
    { parameter: "BOD", value: 30, unit: "mg/L", standardRange: "< 50 mg/L" },
    { parameter: "TSS", value: 45, unit: "mg/L", standardRange: "< 100 mg/L" },
    { parameter: "TDS", value: 1200, unit: "mg/L", standardRange: "< 2100 mg/L" },
    { parameter: "DO", value: 6.5, unit: "mg/L", standardRange: "> 5 mg/L" },
    { parameter: "Flow Rate", value: 120, unit: "m³/hr", standardRange: "100 - 150 m³/hr" },
    { parameter: "Temperature", value: 28, unit: "°C", standardRange: "20 - 35 °C" }
  ]
} 