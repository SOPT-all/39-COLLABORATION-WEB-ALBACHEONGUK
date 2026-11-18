import { useQuery } from '@tanstack/react-query';

import { MOCK_MEMBER_ID } from '../../apis/client.ts';
import { getMyProfile } from '../../apis/members.ts';

export function useMyProfile(isEnabled: boolean, memberId = MOCK_MEMBER_ID) {
  return useQuery({
    queryKey: ['members', 'me', memberId],
    queryFn: () => getMyProfile(memberId),
    enabled: isEnabled,
  });
}
