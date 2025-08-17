/**
 * Temporary placeholder for conversational advisor
 * This file exists to prevent build errors while we implement the new analysis system
 */

export async function chatWithAdvisor(input: { message: string; history?: any[] }): Promise<{ response: string }> {
  // Temporary mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    response: "Esta es una respuesta temporal del asesor. La nueva implementación de análisis está disponible en el Centro de Análisis AFORTU."
  };
}