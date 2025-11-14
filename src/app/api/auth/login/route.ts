import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/shared/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Извлекаем cookies из запроса клиента для передачи на бэкенд
    const cookieHeader = request.headers.get('cookie') || '';
    
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'accept': '*/*',
    };
    
    // Передаем cookies от клиента на бэкенд
    if (cookieHeader) {
      requestHeaders['Cookie'] = cookieHeader;
    }
    
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();

    // Получаем Set-Cookie заголовки из ответа бэкенда
    const setCookieHeaders = response.headers.getSetCookie();

    const responseHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Добавляем Set-Cookie заголовки напрямую
    for (const cookie of setCookieHeaders) {
      responseHeaders.append('Set-Cookie', cookie);
    }

    return NextResponse.json(data, { 
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

