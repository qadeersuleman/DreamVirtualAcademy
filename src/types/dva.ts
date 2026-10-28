/**
 * Dreams Virtual Academy (DVA) - Core Standardized Data Types
 * Enterprise Naming Convention: All primary payload fields prefixed with dva_
 */

export interface DvaStudentEnrollment {
  dva_name: string;
  dva_phone: string;
  dva_age: string | number;
  dva_district: string;
  dva_course_id: string;
  dva_course_title: string;
  dva_price: string;
  dva_instructor: string;
  dva_timestamp?: string;
}

export interface DvaAuthPayload {
  dva_name?: string;
  dva_email: string;
  dva_password: string;
}

export interface DvaTestAttemptPayload {
  dva_user_id: string;
  dva_test_id?: number | null;
  dva_score: number;
  dva_total_questions: number;
  dva_difficulty: string;
  dva_completed_at?: string;
}

export interface DvaUserProfile {
  dva_user_id: string;
  dva_name: string;
  dva_email: string;
  dva_role: 'student' | 'teacher' | 'admin';
  dva_avatar?: string;
}

export interface DvaCourseItem {
  dva_id: string;
  dva_title: string;
  dva_sindhi_title: string;
  dva_price: string;
  dva_duration: string;
  dva_category: string;
  dva_instructor_name: string;
}

