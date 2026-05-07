// ─── Global Types ────────────────────────────────────────────────

export interface Project {
  id: string
  titleDisplay: string     // "Human Work Force" — usage courant
  tagline: LocalizedText
  description: LocalizedText
  tech: string[]
  live?: string
  github?: string
  year: string
  tags: LocalizedText[]
  visual: string           // '/images/projects/xxx.webp'
  palette?: ProjectPalettes
  gallery?: string[]
  galleryDesktop?: string[]
}

export interface ProjectPalette {
  accent: string
  bg: string
  surface: string
  fg: string
}

export interface ProjectPalettes {
  dark: ProjectPalette
  light?: ProjectPalette
}

export interface LocalizedText {
  fr: string
  en: string
}

export interface Module {
  id: string
  titleDisplay: string
  tagline: LocalizedText
  description: LocalizedText
  details: LocalizedText
  highlights: LocalizedText[]
  tech: string[]
  live?: string
  github?: string
  npm?: string
  year: string
  category: LocalizedText
  palette?: ProjectPalettes
}

export interface CreationItem {
  id: string
  title: string
  titleDisplay: LocalizedText
  category: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  details: LocalizedText
  highlights: LocalizedText[]
  tools: string[]
  outputs: LocalizedText[]
  link: string
  year: string
  status: LocalizedText
  palette?: ProjectPalettes
  visual?: string
}

export interface TimelineEntry {
  id: string
  year: string
  title: string
  subtitle: string
  description: { fr: string; en: string }
  type: 'work' | 'project' | 'education'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'learning'
  level: 'expert' | 'confirmed' | 'learning'
}

export interface Quality {
  id: string
  number: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
}

export interface Person {
  name: string
  nameDisplay: string
  role: { fr: string; en: string }
  location: string
  bio: { fr: string; en: string }
  email: string
  github: string
  linkedin: string
  phone?: string
  available: boolean
}

export type MessagingSenderRole = 'visitor' | 'admin'
export type MessagingConversationStatus = 'active' | 'archived' | 'blocked'

export interface MessagingAdminSession {
  userId: string
  email: string | null
}

export interface MessagingConversationSummary {
  id: string
  visitorUsername: string
  status: MessagingConversationStatus
  createdAt: string
  updatedAt: string
  lastMessageAt: string | null
  lastMessagePreview: string | null
  unreadCount: number
}

export interface MessagingMessage {
  id: string
  conversationId: string
  senderRole: MessagingSenderRole
  body: string
  createdAt: string
}

export interface MessagingThread {
  conversation: MessagingConversationSummary
  messages: MessagingMessage[]
}

export interface MessagingVisitorSession {
  conversationId: string
  username: string
  resumeToken: string
}

export interface MessagingStartConversationInput {
  username: string
  message: string
}

export interface MessagingSendMessageInput {
  message: string
}

export interface MessagingAdminCredentials {
  email: string
  password: string
}

export type Theme = 'light' | 'dark'
export type Lang = 'fr' | 'en'

export type { IconName } from './icons'
