# Guide d'implémentation - Messagerie Sécurisée avec Supabase

## Architecture de Sécurité

Ce système utilise une architecture à trois couches pour garantir la sécurité des conversations visiteurs :

1. **Couche Client** : Token brut stocké dans localStorage
2. **Couche API** : Validation du token et accès via service role key
3. **Couche Base de données** : RLS restrictifs pour empêcher l'accès direct

## Étape 1 : Application des Policies RLS

Exécutez le fichier SQL dans le dashboard Supabase :

```bash
# Dans Supabase Dashboard :
# SQL Editor -> New query -> Copier fix_rls_policies.sql -> Run
```

**Important** : Remplacez `MON_EMAIL_ADMIN` par votre email d'administrateur réel dans le fichier SQL.

## Étape 2 : Déploiement de l'Edge Function

```bash
# Installer Supabase CLI si nécessaire
npm install -g supabase

# Se connecter à votre projet
supabase link --project-ref YOUR_PROJECT_REF

# Déployer l'Edge Function
supabase functions deploy validate-visitor-token
```

## Étape 3 : Utilisation du Hook React

```tsx
import { useVisitorSession } from "@/hooks/use-visitor-session";

function MessagingComponent() {
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

  // Au montage, charger la session existante
  useEffect(() => {
    if (hasToken) {
      loadThread();
    }
  }, [hasToken, loadThread]);

  const handleStartConversation = async (username: string, message: string) => {
    await createConversation(username, message);
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div>
      {hasToken ? (
        <ConversationView thread={thread} onSendMessage={handleSendMessage} />
      ) : (
        <StartConversationForm onStart={handleStartConversation} />
      )}
    </div>
  );
}
```

## Étape 4 : Sécurité des Routes API

Les routes API existantes sont déjà sécurisées :

- `/api/messaging/visitor/conversation` : Crée une conversation avec rate limiting
- `/api/messaging/visitor/messages` : Envoie un message avec validation du token
- `/api/messaging/visitor/thread` : Récupère le thread via cookie sécurisé

## Flux de Sécurité

### Création de Conversation

1. **Client** : Génère un token cryptographique aléatoire
2. **Client** : Stocke le token brut dans localStorage
3. **Client** : Envoie le token à l'API
4. **API** : Hash le token avec SHA-256
5. **API** : Stocke le hash dans `visitor_token_hash`
6. **API** : Crée la conversation avec le hash

### Récupération de Conversation

1. **Client** : Récupère le token depuis localStorage
2. **Client** : Envoie le token à l'API (via cookie)
3. **API** : Hash le token avec SHA-256
4. **API** : Compare avec `visitor_token_hash` dans la base
5. **API** : Retourne la conversation si le hash correspond

### Protection Contre l'Accès Non Autorisé

- **Pas d'accès direct** : Les visiteurs ne peuvent pas lire directement les tables
- **Token requis** : Chaque requête nécessite le token valide
- **Hash sécurisé** : Seul le hash est stocké, jamais le token brut
- **Rate limiting** : Protection contre les attaques par force brute
- **RLS restrictifs** : Les politiques empêchent tout accès direct non autorisé

## Variables d'Environnement

Assurez-vous d'avoir ces variables dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Test de Sécurité

### Test 1 : Accès sans token
```bash
curl -X GET http://localhost:3000/api/messaging/visitor/thread
# Résultat : thread: null (pas d'erreur, pas d'accès)
```

### Test 2 : Accès avec token invalide
```bash
curl -X POST http://localhost:3000/api/messaging/visitor/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
# Résultat : 401 Missing conversation token
```

### Test 3 : Tentative d'accès direct via Supabase Client
```javascript
// Cela échouera à cause des RLS
const { data, error } = await supabase
  .from('messaging_conversations')
  .select('*');
// Résultat : error (RLS bloque l'accès)
```

## Maintenance

### Rotation des Tokens

Pour une sécurité maximale, vous pouvez implémenter une rotation des tokens :

```typescript
// Dans lib/visitor-token.ts
export async function rotateVisitorToken(): Promise<string> {
  const oldToken = getVisitorToken();
  if (oldToken) {
    // Invalider l'ancien token via l'API
    await fetch('/api/messaging/visitor/rotate-token', {
      method: 'POST',
    });
  }
  return createAndStoreVisitorToken();
}
```

### Nettoyage des Sessions Expirées

Ajoutez une fonction cron pour nettoyer les conversations inactives :

```sql
-- Dans Supabase SQL Editor
create or replace function cleanup_old_conversations()
returns void
language plpgsql
as $$
begin
  delete from public.messaging_conversations
  where last_message_at < now() - interval '30 days'
    and status = 'archived';
end;
$$;
```

## Résumé de Sécurité

✅ **Tokens cryptographiquement sécurisés** : UUID + SHA-256
✅ **Pas de stockage de token brut** : Seul le hash dans la base
✅ **RLS restrictifs** : Admin uniquement, visiteurs limités à INSERT
✅ **Rate limiting** : Protection contre les abus
✅ **Pas d'accès direct** : Couche API obligatoire
✅ **Isolation des données** : Impossible d'accéder aux conversations d'autres visiteurs
