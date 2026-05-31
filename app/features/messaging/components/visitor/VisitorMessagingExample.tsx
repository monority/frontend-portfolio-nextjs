/**
 * Exemple de composant React pour la messagerie visiteur
 * Utilise le hook useVisitorSession pour gérer la session
 */

"use client";

import { useState, useEffect } from "react";
import { useVisitorSession } from "@/hooks/use-visitor-session";

interface VisitorMessagingExampleProps {
  adminEmail?: string;
}

export default function VisitorMessagingExample({ adminEmail }: VisitorMessagingExampleProps) {
  const {
    token,
    hasToken,
    thread,
    isLoading,
    error,
    createConversation,
    sendMessage,
    loadThread,
    clearSession,
  } = useVisitorSession();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  // Charger la session au montage
  useEffect(() => {
    if (hasToken) {
      loadThread();
    }
  }, [hasToken, loadThread]);

  const handleStartConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !message.trim()) return;

    setIsStarting(true);
    try {
      await createConversation(username.trim(), message.trim());
      setMessage("");
    } finally {
      setIsStarting(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage(message.trim());
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleClearSession = () => {
    clearSession();
    setUsername("");
    setMessage("");
  };

  if (isLoading && !thread) {
    return (
      <div className="messaging-loading">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="messaging-error">
        <p>Erreur: {error}</p>
        <button onClick={handleClearSession}>Réessayer</button>
      </div>
    );
  }

  if (!hasToken || !thread) {
    return (
      <div className="messaging-start">
        <h2>Démarrer une conversation</h2>
        <form onSubmit={handleStartConversation}>
          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Votre nom"
              maxLength={50}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Votre message..."
              rows={4}
              maxLength={1000}
            />
          </div>
          <button type="submit" disabled={isStarting}>
            {isStarting ? "Création..." : "Envoyer"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="messaging-conversation">
      <div className="messaging-header">
        <h2>Conversation avec {thread.conversation.visitorUsername}</h2>
        <button onClick={handleClearSession} type="button">
          Effacer la session
        </button>
      </div>

      <div className="messaging-messages">
        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={`message message--${msg.senderRole}`}
          >
            <span className="message__role">{msg.senderRole}</span>
            <p className="message__body">{msg.body}</p>
            <span className="message__time">
              {new Date(msg.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="messaging-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          rows={3}
          maxLength={1000}
          required
        />
        <button type="submit" disabled={isLoading || !message.trim()}>
          {isLoading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {adminEmail && (
        <div className="messaging-info">
          <small>Admin: {adminEmail}</small>
        </div>
      )}
    </div>
  );
}
