import { client } from './client.ts';
import type { MyProfileResponse } from '../types/member.ts';

export async function getMyProfile(memberId: string) {
  const response = await client.get<MyProfileResponse>('/api/v1/members/me', {
    baseURL: '/',
    headers: { 'X-Member-Id': memberId },
  });

  return response.data.data;
}
