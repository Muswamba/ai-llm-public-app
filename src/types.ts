/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  modelName?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  completed?: boolean;
}

export interface PromptExample {
  id: string;
  label: string;
  promptText: string;
  category: string;
}

export interface CourseRoadmapStep {
  id: number;
  title: string;
  duration: string;
  objective: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
  tags: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  details: string;
  iconName: string;
  learningOutcome: string;
}

export type PlayMode = 'Beginner' | 'Developer' | 'Product';
export type AppView = 'home' | 'chat' | 'course';
