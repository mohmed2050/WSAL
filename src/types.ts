/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppLanguage = 'ar-sd' | 'ar-fn' | 'en';

export interface RecentFile {
  id: string;
  name: string;
  size: string;
  timeStringSd: string;
  timeStringAr: string;
  timeStringEn: string;
  type: 'app' | 'photo' | 'video' | 'file';
  dateAdded: number; // timestamp
}

export type ActiveTab = 'home' | 'send' | 'receive' | 'settings' | 'history';

export interface FileCategory {
  id: 'app' | 'photo' | 'video' | 'file';
  nameArSd: string;
  nameArFn: string;
  nameEn: string;
}

export interface MockTransferItem {
  id: string;
  name: string;
  size: string;
  selected: boolean;
  type: 'app' | 'photo' | 'video' | 'file';
}

export interface SendersMock {
  id: string;
  name: string;
  avatarId: number;
  strength: number; // 1-3
}
