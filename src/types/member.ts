export type MyProfile = {
  name: string;
  ongoingJobCount: number;
};

export type MyProfileResponse = {
  status: number;
  code: string;
  message: string;
  data: MyProfile;
};
