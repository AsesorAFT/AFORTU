/**
 * Insight Accordion Component
 * Collapsible sections for detailed insights and recommendations
 */

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Target, 
  AlertTriangle, 
  TrendingUp,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InsightSection {
  id: string;
  title: string;
  type: 'insight' | 'recommendation' | 'risk' | 'opportunity' | 'education' | 'analysis';
  items: string[];
  priority?: 'high' | 'medium' | 'low';
  badge?: string;
}

export interface InsightAccordionProps {
  sections: InsightSection[];
  className?: string;
  defaultOpenSections?: string[];
}

const sectionConfig = {
  insight: {
    icon: Lightbulb,
    color: 'text-primary',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
  recommendation: {
    icon: Target,
    color: 'text-success-600',
    bgColor: 'bg-success-50',
    borderColor: 'border-success-200',
  },
  risk: {
    icon: AlertTriangle,
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
    borderColor: 'border-warning-200',
  },
  opportunity: {
    icon: TrendingUp,
    color: 'text-success-600',
    bgColor: 'bg-success-50',
    borderColor: 'border-success-200',
  },
  education: {
    icon: BookOpen,
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200',
  },
  analysis: {
    icon: BarChart3,
    color: 'text-primary',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
};

const priorityConfig = {
  high: {
    color: 'text-error-700',
    bgColor: 'bg-error-100',
    label: 'Alta Prioridad'
  },
  medium: {
    color: 'text-warning-700',
    bgColor: 'bg-warning-100',
    label: 'Prioridad Media'
  },
  low: {
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
    label: 'Baja Prioridad'
  },
};

export function InsightAccordion({ 
  sections, 
  className, 
  defaultOpenSections = [] 
}: InsightAccordionProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className={cn('text-center p-8 text-muted-foreground', className)}>
        <BookOpen className="h-8 w-8 mx-auto mb-2" aria-hidden="true" />
        <p>No hay insights disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <Accordion 
      type="multiple" 
      defaultValue={defaultOpenSections}
      className={cn('space-y-2', className)}
    >
      {sections.map((section) => {
        const config = sectionConfig[section.type];
        const Icon = config.icon;
        const priorityStyle = section.priority ? priorityConfig[section.priority] : null;

        return (
          <AccordionItem
            key={section.id}
            value={section.id}
            className={cn(
              'border rounded-lg px-4',
              config.borderColor,
              'transition-all duration-200 hover:shadow-sm'
            )}
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center space-x-3 text-left">
                <div className={cn(
                  'p-2 rounded-lg flex-shrink-0',
                  config.bgColor
                )}>
                  <Icon className={cn('h-4 w-4', config.color)} aria-hidden="true" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-sm">{section.title}</h3>
                    {section.badge && (
                      <Badge variant="outline" className="text-xs">
                        {section.badge}
                      </Badge>
                    )}
                    {priorityStyle && (
                      <Badge 
                        className={cn(
                          'text-xs',
                          priorityStyle.color,
                          priorityStyle.bgColor
                        )}
                      >
                        {priorityStyle.label}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {section.items.length} elemento{section.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="pb-4">
              <div className="space-y-3 ml-12">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-3 rounded-lg border-l-4 transition-colors',
                      config.bgColor,
                      config.borderColor
                    )}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0',
                        section.type === 'recommendation' ? 'bg-success-600 text-white' :
                        section.type === 'risk' ? 'bg-warning-600 text-white' :
                        'bg-primary text-white'
                      )}>
                        {section.type === 'recommendation' ? '✓' : index + 1}
                      </div>
                      <p className="text-sm text-text-secondary flex-1 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Additional context for recommendations */}
                {section.type === 'recommendation' && (
                  <div className="mt-4 p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                    <p className="text-xs text-secondary-700">
                      💡 <strong>Sugerencia:</strong> Consulta con tu asesor de AFORTU para implementar estas recomendaciones de manera personalizada.
                    </p>
                  </div>
                )}
                
                {/* Risk disclaimer */}
                {section.type === 'risk' && (
                  <div className="mt-4 p-3 bg-warning-50 rounded-lg border border-warning-200">
                    <p className="text-xs text-warning-700">
                      ⚠️ <strong>Importante:</strong> Los riesgos identificados requieren monitoreo continuo y posibles ajustes estratégicos.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}