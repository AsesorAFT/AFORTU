/**
 * Portfolio Report PDF Export Utility
 * Generates comprehensive PDF reports using jsPDF and autoTable
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { PortfolioItem } from '../analysis/mockAnalyzePortfolioBatch';

export interface ReportData {
  portfolioItems: PortfolioItem[];
  executiveSummary?: {
    overallRisk: 'low' | 'medium' | 'high';
    diversificationScore: number;
    keyInsights: string[];
    recommendations: string[];
    potentialReturns: {
      conservative: number;
      expected: number;
      optimistic: number;
    };
    riskFactors: string[];
    marketOutlook: string;
    lastUpdated: Date;
  };
  strategy?: {
    name: string;
    description: string;
    riskTolerance: string;
    timeHorizon: string;
  };
  clientInfo?: {
    name?: string;
    id?: string;
  };
}

/**
 * Export portfolio report as PDF
 */
export async function exportPortfolioReportPDF(
  reportData: ReportData,
  filename?: string
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let currentY = 20;

  try {
    // Document metadata
    doc.setProperties({
      title: 'Reporte de Portafolio - AFORTU',
      subject: 'Análisis de Inversiones',
      author: 'AFORTU - Centro de Análisis',
      creator: 'AFORTU Platform',
      keywords: 'portafolio, inversiones, análisis, reporte'
    });

    // Header with AFORTU branding
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(14, 165, 233); // Primary blue
    doc.text('AFORTU', 20, currentY);
    
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105); // Secondary text
    doc.text('Centro de Análisis', 20, currentY + 8);

    // Report title and date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // Primary text
    doc.text('Reporte de Portafolio', pageWidth - 20, currentY, { align: 'right' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Muted text
    const reportDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Fecha de reporte: ${reportDate}`, pageWidth - 20, currentY + 8, { align: 'right' });

    currentY += 30;

    // Client information (if available)
    if (reportData.clientInfo?.name) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(`Cliente: ${reportData.clientInfo.name}`, 20, currentY);
      currentY += 8;
      
      if (reportData.clientInfo.id) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(`ID: ${reportData.clientInfo.id}`, 20, currentY);
        currentY += 12;
      } else {
        currentY += 8;
      }
    }

    // Strategy information (if available)
    if (reportData.strategy) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('Estrategia de Inversión', 20, currentY);
      currentY += 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`Nombre: ${reportData.strategy.name}`, 20, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      
      const strategyLines = doc.splitTextToSize(reportData.strategy.description, pageWidth - 40);
      doc.text(strategyLines, 20, currentY);
      currentY += strategyLines.length * 5 + 4;

      doc.text(`Tolerancia al riesgo: ${reportData.strategy.riskTolerance}`, 20, currentY);
      currentY += 5;
      doc.text(`Horizonte de inversión: ${reportData.strategy.timeHorizon}`, 20, currentY);
      currentY += 15;
    }

    // Portfolio composition table
    if (reportData.portfolioItems && reportData.portfolioItems.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('Composición del Portafolio', 20, currentY);
      currentY += 10;

      // Calculate total value
      const totalValue = reportData.portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);

      // Prepare table data
      const tableData = reportData.portfolioItems.map(item => [
        item.symbol,
        item.name,
        `${(item.weight * 100).toFixed(1)}%`,
        `$${item.currentValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
        `${item.changePercent >= 0 ? '+' : ''}${item.changePercent.toFixed(2)}%`,
        item.sector || 'N/A'
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Símbolo', 'Nombre', 'Peso', 'Valor', 'Cambio %', 'Sector']],
        body: tableData,
        theme: 'striped',
        styles: {
          fontSize: 9,
          textColor: [15, 23, 42],
        },
        headStyles: {
          fillColor: [14, 165, 233],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          2: { halign: 'right' },
          3: { halign: 'right' },
          4: { halign: 'right' },
        },
      });

      // @ts-ignore - autoTable adds finalY to doc
      currentY = doc.lastAutoTable.finalY + 15;

      // Portfolio summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`Valor total del portafolio: $${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`, 20, currentY);
      currentY += 15;
    }

    // Executive Summary
    if (reportData.executiveSummary) {
      const summary = reportData.executiveSummary;
      
      // Check if we need a new page
      if (currentY > pageHeight - 80) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('Resumen Ejecutivo', 20, currentY);
      currentY += 15;

      // Risk and diversification metrics
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Métricas Clave:', 20, currentY);
      currentY += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      
      const riskColor = summary.overallRisk === 'low' ? [34, 197, 94] : 
                       summary.overallRisk === 'medium' ? [245, 158, 11] : [239, 68, 68];
      
      doc.text('• Riesgo general: ', 25, currentY);
      doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
      doc.text(summary.overallRisk === 'low' ? 'Bajo' : 
               summary.overallRisk === 'medium' ? 'Medio' : 'Alto', 75, currentY);
      
      doc.setTextColor(71, 85, 105);
      currentY += 6;
      doc.text(`• Puntuación de diversificación: ${summary.diversificationScore}/100`, 25, currentY);
      currentY += 10;

      // Key insights
      if (summary.keyInsights.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text('Insights Clave:', 20, currentY);
        currentY += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);

        summary.keyInsights.forEach((insight, index) => {
          const lines = doc.splitTextToSize(`${index + 1}. ${insight}`, pageWidth - 50);
          doc.text(lines, 25, currentY);
          currentY += lines.length * 5 + 3;
        });
        currentY += 5;
      }

      // Recommendations
      if (summary.recommendations.length > 0) {
        if (currentY > pageHeight - 60) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text('Recomendaciones:', 20, currentY);
        currentY += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);

        summary.recommendations.forEach((recommendation, index) => {
          const lines = doc.splitTextToSize(`${index + 1}. ${recommendation}`, pageWidth - 50);
          doc.text(lines, 25, currentY);
          currentY += lines.length * 5 + 3;
        });
        currentY += 10;
      }

      // Potential returns
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('Retornos Potenciales (anualizados):', 20, currentY);
      currentY += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`• Conservador: ${(summary.potentialReturns.conservative * 100).toFixed(1)}%`, 25, currentY);
      currentY += 5;
      doc.text(`• Esperado: ${(summary.potentialReturns.expected * 100).toFixed(1)}%`, 25, currentY);
      currentY += 5;
      doc.text(`• Optimista: ${(summary.potentialReturns.optimistic * 100).toFixed(1)}%`, 25, currentY);
      currentY += 10;

      // Market outlook
      if (summary.marketOutlook) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text('Perspectiva del Mercado:', 20, currentY);
        currentY += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const outlookLines = doc.splitTextToSize(summary.marketOutlook, pageWidth - 40);
        doc.text(outlookLines, 20, currentY);
        currentY += outlookLines.length * 5 + 10;
      }

      // Analysis timestamp
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const analysisDate = summary.lastUpdated.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(`Último análisis: ${analysisDate}`, 20, currentY);
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      
      // Page number
      doc.text(`Página ${i} de ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
      
      // Disclaimer
      const disclaimer = 'Este reporte es generado por AFORTU con fines informativos. Consulte con su asesor antes de tomar decisiones de inversión.';
      const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 40);
      doc.text(disclaimerLines, 20, pageHeight - 10 - (disclaimerLines.length * 3));
    }

    // Save the PDF
    const fileName = filename || `Reporte_Portafolio_${new Date().getTime()}.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report');
  }
}