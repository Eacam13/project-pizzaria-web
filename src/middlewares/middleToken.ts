import { NextRequest, NextResponse } from 'next/server';
import { parseCookies } from 'nookies';

export function middleware(request: NextRequest) {
  const cookies = parseCookies({ req: request });
  
  // Verifique se o cookie de autenticação está presente
  if (cookies['@pizzaria.token']) {
    // Redirecione para a página de dashboard se o token estiver presente
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Permite a continuidade da requisição se o cookie não estiver presente
  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup'], // Páginas a serem verificadas pelo middleware
};
