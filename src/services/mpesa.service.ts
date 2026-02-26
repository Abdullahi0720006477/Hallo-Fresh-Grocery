import axios from 'axios';

// M-Pesa Configuration
const MPESA_CONFIG = {
  // Replace with your actual Safaricom Daraja API credentials
  CONSUMER_KEY: process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY || 'YOUR_CONSUMER_KEY_HERE',
  CONSUMER_SECRET: process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET || 'YOUR_CONSUMER_SECRET_HERE',
  BUSINESS_SHORT_CODE: process.env.NEXT_PUBLIC_MPESA_BUSINESS_SHORT_CODE || '174379',
  PASSKEY: process.env.NEXT_PUBLIC_MPESA_PASSKEY || 'YOUR_PASSKEY_HERE',
  CALLBACK_URL: process.env.NEXT_PUBLIC_MPESA_CALLBACK_URL || 'https://yourdomain.com/api/mpesa/callback',
  ENVIRONMENT: process.env.NEXT_PUBLIC_MPESA_ENVIRONMENT || 'sandbox', // 'sandbox' or 'production'
};

const BASE_URL = MPESA_CONFIG.ENVIRONMENT === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

interface AccessTokenResponse {
  access_token: string;
  expires_in: string;
}

interface STKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

interface QueryStatusResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

/**
 * Get access token from Safaricom Daraja API
 */
async function getAccessToken(): Promise<string> {
  try {
    // Return cached token if still valid
    if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
      return cachedAccessToken.token;
    }

    const auth = Buffer.from(
      `${MPESA_CONFIG.CONSUMER_KEY}:${MPESA_CONFIG.CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get<AccessTokenResponse>(
      `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const expiresIn = parseInt(response.data.expires_in) * 1000;
    cachedAccessToken = {
      token: response.data.access_token,
      expiresAt: Date.now() + expiresIn,
    };

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting M-Pesa access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }
}

/**
 * Initiate STK Push (Lipa Na M-Pesa Online)
 */
export async function initiateStkPush(
  phoneNumber: string,
  amount: number,
  orderId: string
): Promise<STKPushResponse> {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    
    // Generate password for STK push
    const password = Buffer.from(
      `${MPESA_CONFIG.BUSINESS_SHORT_CODE}${MPESA_CONFIG.PASSKEY}${timestamp}`
    ).toString('base64');

    // Format phone number to international format (254XXXXXXXXX)
    const formattedPhone = phoneNumber.startsWith('254')
      ? phoneNumber
      : phoneNumber.startsWith('0')
      ? `254${phoneNumber.slice(1)}`
      : `254${phoneNumber}`;

    const response = await axios.post<STKPushResponse>(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: MPESA_CONFIG.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(amount),
        PartyA: formattedPhone,
        PartyB: MPESA_CONFIG.BUSINESS_SHORT_CODE,
        PhoneNumber: formattedPhone,
        CallBackURL: MPESA_CONFIG.CALLBACK_URL,
        AccountReference: orderId,
        TransactionDesc: `Hallo Fresh Grocery - Order ${orderId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error);
    throw new Error('Failed to initiate M-Pesa payment');
  }
}

/**
 * Query transaction status
 */
export async function queryTransactionStatus(
  checkoutRequestId: string
): Promise<QueryStatusResponse> {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    
    const password = Buffer.from(
      `${MPESA_CONFIG.BUSINESS_SHORT_CODE}${MPESA_CONFIG.PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post<QueryStatusResponse>(
      `${BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: MPESA_CONFIG.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error querying transaction status:', error);
    throw new Error('Failed to query transaction status');
  }
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  // Accept formats: 254XXXXXXXXX, 0XXXXXXXXX, +254XXXXXXXXX
  const phoneRegex = /^(\+?254|0)[17][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Format phone number to standard format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+254')) {
    return cleaned.slice(1);
  }
  if (cleaned.startsWith('254')) {
    return cleaned;
  }
  if (cleaned.startsWith('0')) {
    return `254${cleaned.slice(1)}`;
  }
  return cleaned;
}
