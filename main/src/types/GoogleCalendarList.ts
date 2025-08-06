export type GoogleCalendarList = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  items: GoogleCalendarListEntry[];
};

export type GoogleCalendarListEntry = {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description?: string;
  location?: string;
  timeZone?: string;
  summaryOverride?: string;
  colorId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  selected?: boolean;
  accessRole: string;
  defaultReminders?: Array<{
    method: string;
    minutes: number;
  }>;
  notificationSettings?: {
    notifications: Array<{
      type: string;
      method: string;
    }>;
  };
  primary?: boolean;
  deleted?: boolean;
  hidden?: boolean;
};
