/**
 * Dreams Virtual Academy (DVA/DVM) - Core Standardized Security & Data Types
 * Enterprise Naming Convention: All primary and sensitive fields prefixed with dvm_
 */

export interface DvmStudentEnrollment {
  dvm_name: string;
  dvm_phone: string;
  dvm_age: string | number;
  dvm_district: string;
  dvm_course_id: string;
  dvm_course_title: string;
  dvm_price: string;
  dvm_instructor: string;
  dvm_timestamp?: string;
}

export interface DvmAuthPayload {
  dvm_name?: string;
  dvm_email: string;
  dvm_password: string;
}

export interface DvmResetPasswordPayload {
  dvm_password: string;
  dvm_confirmPassword: string;
}

export interface DvmForgotPasswordPayload {
  dvm_email: string;
}

export interface DvmTestAttemptPayload {
  dvm_user_id: string;
  dvm_test_id?: number | null;
  dvm_score: number;
  dvm_total_questions: number;
  dvm_difficulty: string;
  dvm_completed_at?: string;
}

export interface DvmUserProfile {
  dvm_user_id: string;
  dvm_name: string;
  dvm_email: string;
  dvm_phone?: string;
  dvm_role: 'student' | 'teacher' | 'admin';
  dvm_avatar?: string;
}

export interface DvmCourseItem {
  dvm_id: string;
  dvm_title: string;
  dvm_sindhi_title: string;
  dvm_price: string;
  dvm_duration: string;
  dvm_category: string;
  dvm_instructor_name: string;
}

// Backward-compatible DVA aliases
export type DvaStudentEnrollment = DvmStudentEnrollment & {
  dva_name?: string;
  dva_phone?: string;
  dva_age?: string | number;
  dva_district?: string;
  dva_course_id?: string;
  dva_course_title?: string;
  dva_price?: string;
  dva_instructor?: string;
  dva_timestamp?: string;
};

export type DvaAuthPayload = DvmAuthPayload & {
  dva_name?: string;
  dva_email?: string;
  dva_password?: string;
};

export type DvaTestAttemptPayload = DvmTestAttemptPayload & {
  dva_user_id?: string;
  dva_test_id?: number | null;
  dva_score?: number;
  dva_total_questions?: number;
  dva_difficulty?: string;
  dva_completed_at?: string;
};

export type DvaUserProfile = DvmUserProfile & {
  dva_user_id?: string;
  dva_name?: string;
  dva_email?: string;
  dva_role?: 'student' | 'teacher' | 'admin';
  dva_avatar?: string;
};

export type DvaCourseItem = DvmCourseItem & {
  dva_id?: string;
  dva_title?: string;
  dva_sindhi_title?: string;
  dva_price?: string;
  dva_duration?: string;
  dva_category?: string;
  dva_instructor_name?: string;
};


