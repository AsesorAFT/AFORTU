/**
 * Strategy Configurator Component
 * Form for creating and editing investment strategies
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StrategyConfig } from '@/hooks/useStrategies';

export interface StrategyConfiguratorProps {
  onSave: (strategy: Omit<StrategyConfig, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  initialData?: Partial<StrategyConfig>;
  isEditing?: boolean;
  className?: string;
}

// Available focus areas for strategies
const availableFocusAreas = [
  'Acciones',
  'Bonos', 
  'ETFs diversificados',
  'Dividendos',
  'REITs',
  'Technology',
  'Healthcare',
  'Clean Energy',
  'International',
  'Emerging Markets',
  'Commodities',
  'ESG',
  'Value',
  'Growth',
];

const riskToleranceOptions = [
  { value: 'conservative', label: 'Conservador', description: 'Prioriza preservación de capital' },
  { value: 'moderate', label: 'Moderado', description: 'Balance entre crecimiento y estabilidad' },
  { value: 'aggressive', label: 'Agresivo', description: 'Busca máximo crecimiento' },
] as const;

const timeHorizonOptions = [
  { value: 'short', label: 'Corto plazo', description: 'Menos de 2 años' },
  { value: 'medium', label: 'Mediano plazo', description: '2-7 años' },
  { value: 'long', label: 'Largo plazo', description: 'Más de 7 años' },
] as const;

export function StrategyConfigurator({
  onSave,
  onCancel,
  initialData,
  isEditing = false,
  className,
}: StrategyConfiguratorProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    riskTolerance: initialData?.riskTolerance || 'moderate' as const,
    timeHorizon: initialData?.timeHorizon || 'medium' as const,
    focusAreas: initialData?.focusAreas || [] as string[],
  });

  // UI state
  const [newFocusArea, setNewFocusArea] = useState('');
  const [isCustomFocusArea, setIsCustomFocusArea] = useState(false);

  // Validation
  const isValid = formData.name.trim().length > 0 && 
                  formData.description.trim().length > 0 && 
                  formData.focusAreas.length > 0;

  // Add focus area
  const addFocusArea = (area: string) => {
    if (area.trim() && !formData.focusAreas.includes(area.trim())) {
      setFormData(prev => ({
        ...prev,
        focusAreas: [...prev.focusAreas, area.trim()],
      }));
      setNewFocusArea('');
      setIsCustomFocusArea(false);
    }
  };

  // Remove focus area
  const removeFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.filter(fa => fa !== area),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      return;
    }

    onSave({
      name: formData.name.trim(),
      description: formData.description.trim(),
      riskTolerance: formData.riskTolerance,
      timeHorizon: formData.timeHorizon,
      focusAreas: formData.focusAreas,
    });

    // Reset form if not editing
    if (!isEditing) {
      setFormData({
        name: '',
        description: '',
        riskTolerance: 'moderate',
        timeHorizon: 'medium',
        focusAreas: [],
      });
    }
  };

  return (
    <Card className={cn('fade-in', className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>{isEditing ? 'Editar Estrategia' : 'Nueva Estrategia'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Strategy Name */}
          <div className="space-y-2">
            <Label htmlFor="strategy-name">
              Nombre de la Estrategia
              <span className="text-error-500 ml-1" aria-label="Campo requerido">*</span>
            </Label>
            <Input
              id="strategy-name"
              type="text"
              placeholder="ej: Crecimiento Tecnológico"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={cn(
                formData.name.trim().length === 0 && 'border-error-200 focus:border-error-500'
              )}
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.name.length}/100 caracteres
            </p>
          </div>

          {/* Strategy Description */}
          <div className="space-y-2">
            <Label htmlFor="strategy-description">
              Descripción
              <span className="text-error-500 ml-1" aria-label="Campo requerido">*</span>
            </Label>
            <Textarea
              id="strategy-description"
              placeholder="Describe los objetivos y enfoque de esta estrategia..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={cn(
                'min-h-[80px]',
                formData.description.trim().length === 0 && 'border-error-200 focus:border-error-500'
              )}
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          {/* Risk Tolerance */}
          <div className="space-y-3">
            <Label>Tolerancia al Riesgo</Label>
            <Select
              value={formData.riskTolerance}
              onValueChange={(value: 'conservative' | 'moderate' | 'aggressive') => 
                setFormData(prev => ({ ...prev, riskTolerance: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {riskToleranceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Horizon */}
          <div className="space-y-3">
            <Label>Horizonte de Inversión</Label>
            <Select
              value={formData.timeHorizon}
              onValueChange={(value: 'short' | 'medium' | 'long') => 
                setFormData(prev => ({ ...prev, timeHorizon: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeHorizonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Focus Areas */}
          <div className="space-y-3">
            <Label>
              Áreas de Enfoque
              <span className="text-error-500 ml-1" aria-label="Campo requerido">*</span>
            </Label>
            
            {/* Selected focus areas */}
            {formData.focusAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-secondary/50 rounded-md">
                {formData.focusAreas.map((area) => (
                  <Badge
                    key={area}
                    variant="secondary"
                    className="flex items-center space-x-1 cursor-pointer hover:bg-error-100"
                    onClick={() => removeFocusArea(area)}
                  >
                    <span>{area}</span>
                    <X className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">Remover {area}</span>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add focus area */}
            <div className="space-y-2">
              {!isCustomFocusArea ? (
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      setIsCustomFocusArea(true);
                    } else {
                      addFocusArea(value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un área de enfoque" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFocusAreas
                      .filter(area => !formData.focusAreas.includes(area))
                      .map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    <SelectItem value="custom">
                      <div className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Área personalizada...</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Nombre del área personalizada"
                    value={newFocusArea}
                    onChange={(e) => setNewFocusArea(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFocusArea(newFocusArea);
                      }
                    }}
                    maxLength={50}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => addFocusArea(newFocusArea)}
                    disabled={!newFocusArea.trim()}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Agregar área</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setIsCustomFocusArea(false);
                      setNewFocusArea('');
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancelar</span>
                  </Button>
                </div>
              )}
            </div>

            {formData.focusAreas.length === 0 && (
              <p className="text-sm text-error-600">
                Selecciona al menos un área de enfoque
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <div className="flex space-x-2 ml-auto">
              <Button 
                type="submit" 
                disabled={!isValid}
                className="ai-gradient-bg text-white hover:opacity-90"
              >
                {isEditing ? 'Actualizar Estrategia' : 'Crear Estrategia'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}