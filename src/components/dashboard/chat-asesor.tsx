
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Bot, Loader2, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { chatWithAdvisor } from '@/ai/flows/conversational-advirsor';
import { ChatMessage } from '@/ai/schemas/chats';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { ScrollArea } from '../ui/scroll-area';

export function ChatAsesor() {
  const [user] = useAuthState(auth);
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
      const result = await chatWithAdvisor({
        history: messages,
        message: currentMessage,
      });

      setMessages([...newMessages, { role: 'model', content: result.response }]);
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
                            {msg.role === 'model' && (
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
