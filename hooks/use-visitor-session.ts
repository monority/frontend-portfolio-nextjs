/**
 * React Hook pour la gestion de session visiteur
 * Gère automatiquement la création, stockage et récupération des tokens visiteurs
 */

import { useState, useEffect } from "react";
import type { MessagingConversationSummary, MessagingThread } from "@shared-types";

import {
  storeVisitorToken,
  getVisitorToken,
  clearVisitorToken,
  createAndStoreVisitorToken,
} from "@/lib/visitor-token";

interface UseVisitorSessionResult {
  token: string | null;
  hasToken: boolean;
  thread: MessagingThread | null;
  isLoading: boolean;
  error: string | null;
  createConversation: (username: string, message: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  loadThread: () => Promise<void>;
  clearSession: () => void;
}

export function useVisitorSession(): UseVisitorSessionResult {
  const [token, setToken] = useState<string | null>(null);
  const [thread, setThread] = useState<MessagingThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger le token au montage du composant
  useEffect(() => {
    const storedToken = getVisitorToken();
    setToken(storedToken);
  }, []);

  const createConversation = async (username: string, message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Créer un nouveau token
      const newToken = await createAndStoreVisitorToken();
      setToken(newToken);

      // Créer la conversation via l'API
      const response = await fetch("/api/messaging/visitor/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create conversation");
      }

      const data = await response.json();
      setThread(data.thread);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create conversation");
      clearVisitorToken();
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!token) {
      setError("No active session");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/messaging/visitor/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      const data = await response.json();
      setThread(data.thread);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const loadThread = async () => {
    if (!token) {
      setThread(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/messaging/visitor/thread");
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to load thread");
      }

      const data = await response.json();
      
      if (!data.thread) {
        // Token invalide, nettoyer
        clearVisitorToken();
        setToken(null);
        setThread(null);
      } else {
        setThread(data.thread);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load thread");
      clearVisitorToken();
      setToken(null);
      setThread(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    clearVisitorToken();
    setToken(null);
    setThread(null);
    setError(null);
  };

  return {
    token,
    hasToken: token !== null,
    thread,
    isLoading,
    error,
    createConversation,
    sendMessage,
    loadThread,
    clearSession,
  };
}
