
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Send, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/ai/schemas/chats';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { ScrollArea } from '../ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { unifiedChat } from '@/ai/flows/unified-advisor';


const GeminiStarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91L12 0Z" />
    </svg>
);

const AFTAvatar = () => (
    <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
        <Bot className="text-primary-foreground h-5 w-5" />
    </div>
)

export function ChatClient() {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [messages, setMessages] = useState<(ChatMessage)[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if(viewport){
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (messageToSend?: string) => {
    const currentMessage = (messageToSend || input).trim();
    if (!currentMessage) return;

    const userMessage: ChatMessage = { role: 'user', content: currentMessage };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await unifiedChat({
        history: newMessages,
        message: currentMessage,
      });

       const responseContent = result.response;
       setMessages([...newMessages, { role: 'model', content: responseContent }]);
      
    } catch (error) {
      console.error("Error al chatear con el asesor:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo conectar con el asesor de IA. Inténtalo de nuevo.",
      });
       setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-card rounded-lg border">
        <div className="p-4 border-b flex items-center gap-4">
             <AFTAvatar />
            <div>
                <h2 className="text-lg font-semibold">Asesor AFT</h2>
                <p className="text-sm text-muted-foreground">Analiza tu portafolio, negocio o noticias del mercado.</p>
            </div>
        </div>

        <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
             <div className="space-y-6">
                {messages.length === 0 && !isLoading ? (
                     <div className="text-center text-muted-foreground py-8">
                        <p className="mb-4 font-medium text-lg">¿Cómo puedo potenciar tus finanzas hoy?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <Button variant="outline" className="bg-background/80" onClick={() => handleSendMessage('Analiza mi portafolio actual y dame recomendaciones.')}>Analizar mi portafolio</Button>
                            <Button variant="outline" className="bg-background/80" onClick={() => handleSendMessage('¿Cuáles son las proyecciones para mi negocio?')}>Generar proyecciones de negocio</Button>
                            <Button variant="outline" className="bg-background/80" onClick={() => handleSendMessage('Explícame el interés compuesto con un ejemplo.')}>Explicar interés compuesto</Button>
                            <Button variant="outline" className="bg-background/80" onClick={() => handleSendMessage('¿Cuáles son los riesgos de invertir en tecnología ahora mismo?')}>Preguntar sobre riesgos</Button>
                        </div>
                        <Accordion type="single" collapsible className="w-full mt-6 text-left">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="text-sm font-medium">¿Qué más puedes hacer con Asesor AFT?</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground">
                                <li>Análisis de mercados y noticias financieras.</li>
                                <li>Análisis y optimización de portafolios de inversión.</li>
                                <li>Explicación de conceptos financieros complejos.</li>
                                <li>Cálculos y proyecciones de pensión.</li>
                                <li>Desarrollo de estrategias de inversión en acciones.</li>
                                <li>Seguimiento de cuentas y movimientos en AFORTU.</li>
                                <li>Cálculo de facturas, saldos pendientes y aclaraciones.</li>
                                <li>Seguimiento de solicitudes de liquidez estructurada.</li>
                                <li>Información sobre planes de inversión y sus proyecciones.</li>
                                <li>Notificación sobre promociones exclusivas de tasas de interés.</li>
                              </ul>
                               <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                                © 2024 AFORTU. Todos los derechos reservados. El uso de este marco y su contenido está sujeto a nuestros términos de servicio y políticas de propiedad industrial.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    </div>
                ) : (
                     messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-4", msg.role === 'user' && 'justify-end')}>
                            {msg.role === 'model' && (
                                <AFTAvatar />
                            )}
                            <div className={cn("rounded-xl px-4 py-3 max-w-2xl", 
                                msg.role === 'user' 
                                    ? 'bg-gradient-to-r from-accent to-primary text-primary-foreground' 
                                    : 'bg-muted'
                            )}>
                               <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.role === 'user' && (
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.photoURL || ""} alt="User avatar" />
                                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex items-start gap-3">
                         <AFTAvatar />
                        <div className="rounded-lg px-4 py-3 bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
        <div className="border-t p-4">
            <div className="relative">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Escribe tu mensaje o pega una noticia para analizar..."
                disabled={isLoading}
                className="pr-12 h-12 text-base"
                />
                <Button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-gradient-to-br from-primary to-accent">
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    </div>
  );
}
