import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/shared/lib/constants';

// Вспомогательная функция для проксирования запросов
async function proxyRequest(
  request: NextRequest,
  backendPath: string,
  method: string = 'GET',
  body?: unknown
) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';

    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'accept': '*/*',
    };

    if (cookieHeader) {
      requestHeaders['Cookie'] = cookieHeader;
    }

    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: 'include',
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${BACKEND_URL}/partner${backendPath}`, fetchOptions);
    
    const responseText = await response.text();
    const data = responseText.trim() 
      ? JSON.parse(responseText) 
      : {};

    const responseHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': `${method}, OPTIONS`,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    });

    const setCookieHeaders = response.headers.getSetCookie();
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return proxyRequest(request, `/kiosks/${id}/errors/clear`, 'POST');
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

