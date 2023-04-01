import fastq from "fastq";
import type { queueAsPromised, done } from "fastq";

import {
  NotificationTask,
  notificationAppointmentWorker,
} from "./notification-appointment.worker";

export const appointmentNotificationQueue: queueAsPromised<NotificationTask> =
  fastq.promise(notificationAppointmentWorker, 1);
