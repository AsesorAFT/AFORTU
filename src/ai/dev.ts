import { config } from 'dotenv';
config();

import '@/ai/flows/business-insights-from-portfolio-data.ts';
import '@/ai/flows/generate-business-insights.ts';
import '@/ai/flows/market-trend-analyzer.ts';
import '@/ai/flows/portfolio-analyzer.ts';
import '@/ai/flows/conversational-advisor.ts';
import '@/ai/flows/unified-advisor.ts';
import '@/ai/schemas/chat.ts';
import '@/ai/schemas/portfolio.ts';
import '@/ai/schemas/business.ts';
import '@/ai/schemas/market.ts';
import '@/ai/tools/stock-tools.ts';
import '@/ai/tools/user-data-tools.ts';
