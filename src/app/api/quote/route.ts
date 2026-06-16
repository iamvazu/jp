import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the incoming RFQ configuration payload on the server terminal console
    console.log('=== INCOMING RFQ SUBMISSION ===');
    console.log('Contact info:', JSON.stringify(body.contact, null, 2));
    console.log('Items requested:', JSON.stringify(body.items, null, 2));
    console.log('===============================');

    // Simulate database write or emailing automation (100ms lag)
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Return success response to the client
    return NextResponse.json({
      success: true,
      message: 'RFQ received successfully. Our engineering office has been notified.',
      referenceNumber: `JP-RFQ-${Math.floor(100000 + Math.random() * 900000)}`
    });
  } catch (error) {
    console.error('Error handling RFQ request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing RFQ' },
      { status: 500 }
    );
  }
}
