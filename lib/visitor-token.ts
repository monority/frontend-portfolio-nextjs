/**
 * Visitor Token Management
 * Gestion sécurisée des tokens pour les visiteurs anonymes
 */

import {
  MESSAGING_RESUME_STORAGE_KEY,
  createMessagingResumeToken,
  hashMessagingResumeToken,
} from "./supabase/utils";

/**
 * Stocke le token brut dans localStorage
 */
export function storeVisitorToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MESSAGING_RESUME_STORAGE_KEY, token);
}

/**
 * Récupère le token brut depuis localStorage
 */
export function getVisitorToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(MESSAGING_RESUME_STORAGE_KEY);
}

/**
 * Supprime le token du localStorage
 */
export function clearVisitorToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MESSAGING_RESUME_STORAGE_KEY);
}

/**
 * Génère et stocke un nouveau token visiteur
 */
export async function createAndStoreVisitorToken(): Promise<string> {
  const token = createMessagingResumeToken();
  storeVisitorToken(token);
  return token;
}

/**
 * Vérifie si un token visiteur existe
 */
export function hasVisitorToken(): boolean {
  return getVisitorToken() !== null;
}

/**
 * Hash un token pour comparaison avec la base de données
 */
export async function hashToken(token: string): Promise<string> {
  return hashMessagingResumeToken(token);
}
