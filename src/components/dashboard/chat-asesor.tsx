
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Bot, Loader2, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/ai/schemas/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '@/lib/firebase';
import { ScrollArea } from '../ui/scroll-area';

// Función para generar respuestas simuladas del asesor
const generateAsesorResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('inversión') || lowerMessage.includes('plan')) {
    return `¡Excelente pregunta! En AFORTU ofrecemos dos productos principales:

📊 **Tasa Fija AFORTU**: Inversión segura con rendimiento garantizado del 15% anual, ideal para quienes buscan estabilidad.

📈 **Asset Management**: Gestión profesional diversificada con potencial de 13.2% de rendimiento, perfecta para maximizar tu patrimonio.

¿Te gustaría conocer más detalles sobre alguno de estos productos? Te recomiendo revisar estos temas con tu asesor personal para mayor detalle.`;
  }
  
  if (lowerMessage.includes('liquidez') || lowerMessage.includes('estructurada')) {
    return `La liquidez estructurada es una estrategia avanzada que te permite:

💡 **Acceso gradual**: Puedes retirar fondos de manera escalonada según tus necesidades.

🔄 **Flexibilidad**: Mantén un equilibrio entre rentabilidad y disponibilidad de capital.

📅 **Plazos ajustables**: Diseñamos la estructura según tu perfil y objetivos.

En AFORTU, nuestro Asset Management incluye componentes de liquidez para optimizar tu portafolio. Te sugiero agendar una llamada con tu asesor para personalizar tu estrategia.`;
  }
  
  if (lowerMessage.includes('aportaciones') || lowerMessage.includes('mensuales')) {
    return `Las aportaciones mensuales son una estrategia poderosa:

💰 **Promedio de costos**: Reduces el impacto de la volatilidad del mercado.

📈 **Crecimiento constante**: Tu patrimonio crece de forma sistemática mes a mes.

🎯 **Disciplina financiera**: Desarrollas el hábito del ahorro e inversión.

Con nuestro Asset Management puedes hacer aportaciones desde $5,000 MXN mensuales. ¿Te interesa conocer una proyección personalizada?`;
  }
  
  if (lowerMessage.includes('interés') || lowerMessage.includes('compuesto')) {
    return `¡El interés compuesto es la octava maravilla del mundo según Einstein! 

🚀 **Efecto multiplicador**: Ganas rendimientos sobre tus rendimientos anteriores.

⏰ **El tiempo es clave**: Mientras más pronto comiences, mayor será el impacto.

📊 **Ejemplo práctico**: $100,000 al 15% anual se convierten en $405,769 en 10 años.

En AFORTU aprovechamos este poder con nuestros productos de Tasa Fija y Asset Management. ¡Te invito a revisar las proyecciones con tu asesor!`;
  }
  
  if (lowerMessage.includes('portafolio') || lowerMessage.includes('diversific')) {
    return `Tu portafolio actual en AFORTU está bien diversificado:

🏆 **Asset Management ($90,000)**:
- Acciones: 35%
- Deuda privada: 30%
- Deuda pública: 20%
- Liquidez: 15%

💼 **Tasa Fija ($150,000)**: Estabilidad garantizada al 15% anual.

Esta diversificación te permite equilibrar riesgo y rentabilidad. ¿Te gustaría explorar oportunidades de rebalanceo?`;
  }
  
  // Respuesta general
  return `¡Hola! Soy tu Asesor AFT de AFORTU. 

Como puedes ver en tu dashboard, tienes un portafolio sólido de $240,000 MXN diversificado entre nuestros productos estrella.

🎯 **¿En qué puedo ayudarte hoy?**
- Análisis de tu portafolio actual
- Estrategias de optimización fiscal  
- Oportunidades de inversión
- Planificación a largo plazo

Te recomiendo agendar una llamada con tu asesor personal María González para profundizar en cualquier tema. ¡Estamos aquí para potenciar tu patrimonio!`;
};

export function ChatAsesor() {
  // const [user] = useAuthState(auth);
  const user = { displayName: 'Usuario Demo', photoURL: null }; // Usuario simulado
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport){
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInitialMessage = (message: string) => {
      handleSendMessage(message);
  }

  const handleSendMessage = async (messageToSend?: string) => {
    const currentMessage = (messageToSend || input).trim();
    if (!currentMessage) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: currentMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Simular respuesta del asesor AFT para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
      
      const simulatedResponse = generateAsesorResponse(currentMessage);
      
      setMessages([...newMessages, { role: 'assistant', content: simulatedResponse }]);
    } catch (error) {
      console.error("Error al chatear con el asesor:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo conectar con el asesor de IA. Inténtalo de nuevo.",
      });
       setMessages(messages); // Revert messages on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="h-4 w-4 mr-2" />
          Asesor AFT
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl h-[70vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" />Chatea con tu Asesor AFT</DialogTitle>
          <DialogDescription>
            Hazme preguntas sobre tus finanzas, el mercado o estrategias de inversión.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6" ref={scrollAreaRef}>
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        <p className="mb-4">¿Sobre qué te gustaría hablar?</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <Button variant="outline" size="sm" onClick={() => handleInitialMessage('Háblame sobre mis planes de inversión.')}>Planes de inversión</Button>
                            <Button variant="outline" size="sm" onClick={() => handleInitialMessage('¿Cómo funciona la liquidez estructurada?')}>Liquidez estructurada</Button>
                            <Button variant="outline" size="sm" onClick={() => handleInitialMessage('Ventajas de las aportaciones mensuales.')}>Aportaciones mensuales</Button>
                            <Button variant="outline" size="sm" onClick={() => handleInitialMessage('Explícame el interés compuesto.')}>Interés compuesto</Button>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                            {msg.role === 'assistant' && (
                                <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                                    <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("rounded-lg px-4 py-2 max-w-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                             {msg.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.photoURL || ""} alt="User avatar" />
                                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))
                )}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                         <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                            <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                 )}
            </div>
        </ScrollArea>
        <div className="p-6 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
            />
            <Button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
