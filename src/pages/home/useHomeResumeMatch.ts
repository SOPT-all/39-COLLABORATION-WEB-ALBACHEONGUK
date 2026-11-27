import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MOCK_MEMBER_ID } from '../../apis/client.ts';
import {
  getResumeRecommendations,
  resumeRecommendationOptions,
} from '../../apis/resumeRecommendation.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import { toResume } from '../../utils/resume.ts';
import { toMatchJobCard } from './mapResumeRecommendation.ts';
import { getQaHomeRecommendation } from './qaHomeResumeRecommendation.ts';

export function useHomeResumeMatch() {
  const { isSignedIn, qa } = useQaResumeScenario();
  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>();
  const [hasRetried, setHasRetried] = useState(false);
  const isQaSimulation = qa !== null && qa !== 'guest';
  const shouldFailQa = qa === 'match-error' && !hasRetried;
  // 목업 로그인 상태면 회원 번호 '1'을 보내고, 비로그인이면 보내지 않습니다. (#80 공용 함수 기준)
  const memberId = isSignedIn ? MOCK_MEMBER_ID : undefined;

  function getRecommendation(resumeId: number | undefined, signal: AbortSignal) {
    return isQaSimulation
      ? getQaHomeRecommendation(qa, resumeId, shouldFailQa, signal)
      : getResumeRecommendations({ resumeId }, memberId);
  }

  const queryOptions = {
    // 비로그인은 서버를 부르지 않고 바로 로그인 안내를 보여줍니다.
    enabled: isSignedIn,
    retry: false,
    refetchOnWindowFocus: false,
  } as const;

  const baseQuery = useQuery({
    ...queryOptions,
    ...resumeRecommendationOptions({}, memberId),
    queryKey: isQaSimulation
      ? ['resume-recommendations', 'qa', 'home', memberId, undefined, qa, shouldFailQa]
      : resumeRecommendationOptions({}, memberId).queryKey,
    queryFn: ({ signal }) => getRecommendation(undefined, signal),
  });

  const query = useQuery({
    ...queryOptions,
    ...resumeRecommendationOptions({ resumeId: selectedResumeId }, memberId),
    queryKey: isQaSimulation
      ? ['resume-recommendations', 'qa', 'home', memberId, selectedResumeId, qa, shouldFailQa]
      : resumeRecommendationOptions({ resumeId: selectedResumeId }, memberId).queryKey,
    // 이력서를 바꿔 다시 불러오는 동안 이전 추천을 유지해 화면이 깜빡이지 않게 합니다.
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getRecommendation(selectedResumeId, signal),
  });

  const data = query.data;
  const resumes = (baseQuery.data?.resumes ?? [])
    .filter((resume) => resume.status === 'COMPLETED')
    .map(toResume);
  const selectedResumeKey = String(
    selectedResumeId ?? data?.selectedResume?.resumeId ?? baseQuery.data?.selectedResume?.resumeId,
  );
  const selectedResume = data?.selectedResume ? toResume(data.selectedResume) : undefined;
  const jobs = (data?.jobs ?? []).map(toMatchJobCard);
  const isMatched = isSignedIn && data?.status === 'OK' && jobs.length > 0;
  const isNoMatch =
    isSignedIn &&
    (data?.status === 'NO_RECOMMENDATION' || (data?.status === 'OK' && jobs.length === 0));
  const showResumeRow = isSignedIn && (query.isPending || query.isError || isMatched || isNoMatch);
  const canSelectResume = showResumeRow && resumes.some(({ id }) => id === selectedResumeKey);

  function handleRetry() {
    setHasRetried(true);
    void baseQuery.refetch();
    void query.refetch();
  }

  function handleSelectResume(id: string) {
    setSelectedResumeId(Number(id));
  }

  const noticeVariant: 'guest' | 'none' | 'draft' | 'no-match' =
    !isSignedIn || data?.status === 'GUEST'
      ? 'guest'
      : data?.status === 'NO_RESUME'
        ? 'none'
        : data?.status === 'DRAFT_ONLY'
          ? 'draft'
          : 'no-match';
  return {
    isSignedIn,
    data,
    resumes,
    selectedResumeKey,
    selectedResume,
    jobs,
    isMatched,
    isNoMatch,
    showResumeRow,
    canSelectResume,
    noticeVariant,
    isPending: query.isPending,
    isError: query.isError,
    handleRetry,
    handleSelectResume,
  };
}
